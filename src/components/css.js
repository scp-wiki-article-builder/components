import { checkComponentNamedParams, checkComponentHasChildren } from 'scpwiki-handlebars-util';

const componentName = 'css';

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
export default (options) => {
    checkComponentHasChildren(componentName, options);
    checkComponentNamedParams(componentName, componentSpec, options.hash);

    return `\
[[module CSS show="${options.hash.show || false}" disable="${options.hash.disable || false}"]]
${options.fn(this)}\
[[/module]]`;
};
