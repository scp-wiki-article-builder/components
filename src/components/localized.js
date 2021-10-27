import { checkComponentParam } from 'scpwiki-handlebars-util';

const componentName = 'localized';

/**
 * Selects the right localized partial name
 * given the value of the 'locale' property.
 * @module localized
 * @param {string} partialBaseName
 * @param {Handlebars.HelperOptions} options
 * @returns {string} Full name of the partial to execute
 */
export default function (partialBaseName, options) {
    checkComponentParam(componentName, 'string', partialBaseName);

    return `${partialBaseName}.${options.data.config.locale}`;
}
