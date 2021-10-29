import {
    checkComponentParam,
    ComponentTypeCheckError,
    ValidationException,
    ComponentException,
} from '@scp-wiki-article-builder/util';

const componentName = 'i18n';

/**
 * Depending on the parameter value, either:
 * - returns a partial's localized name if the parameter value begins with '@...'
 * - returns a localized string
 * @module i18n
 * @param {string} partialBaseNameOrStringName
 * @param {Handlebars.HelperOptions} options
 * @returns {string} Full name of the partial to execute or a localized string
 */
export default function (partialBaseNameOrStringName, options) {
    checkComponentParam(componentName, 'string', partialBaseNameOrStringName);

    if (partialBaseNameOrStringName.startsWith('@')) {
        return `${partialBaseNameOrStringName.substring(1)}.${options.data.config.locale}`;
    } else if (options.data.strings[partialBaseNameOrStringName]) {
        return options.data.strings[partialBaseNameOrStringName];
    } else {
        throw new ComponentException(
            componentName,
            `"${partialBaseNameOrStringName}" is neither a partial's base name ` +
            'nor a localized string name.'
        );
    }
}
