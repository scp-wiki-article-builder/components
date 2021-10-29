import { checkComponentNamedParams, checkComponentHasChildren } from '@scp-wiki-article-builder/util';

const componentName = 'CSS';

const componentSpec = {
    show: { type: 'boolean', optional: true },
    disable: { type: 'boolean', optional: true }
};

/**
 * Wikidit CSS module.
 * @module CSS
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    checkComponentHasChildren(componentName, options);
    checkComponentNamedParams(componentName, componentSpec, options.hash);

    return `\
[[module CSS show="${options.hash.show || false}" disable="${options.hash.disable || false}"]]
${options.fn(this)}\
[[/module]]`;
}
