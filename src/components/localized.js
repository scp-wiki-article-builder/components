import { checkComponentParam } from 'scpwiki-handlebars-util';

const componentName = 'localized';

/**
 * Selects the right localized partial name
 * given the value of the 'locale' property.
 * @module localized
 * @param {string} partialBaseName
 * @returns {string} Full name of the partial to execute
 */
export default function (partialBaseName) {
    checkComponentParam(componentName, 'string', partialBaseName);

    return `${partialBaseName}.${this.locale}`;
}
