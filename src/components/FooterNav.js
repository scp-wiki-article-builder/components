import { checkComponentNamedParams } from 'scpwiki-handlebars-util';

const componentName = 'FooterNav';

const componentSpecArticle = {
    itemNumber: 'number',
    prev: { type: 'string', optional: true },
    next: { type: 'string', optional: true }
};

const componentSpecTale = {
    current: 'string',
    prev: { type: 'string', optional: true },
    next: { type: 'string', optional: true }
};

/**
 * SCP-Wiki footer navigation links.
 *
 * When the "itemNumber" parameter is set then
 * "prev" will be set to "SCP-<itemNumber - 1>"
 * and "next" to "SCP-<itemNumber + 1>" if
 * they are not already set. Setting "prev" or
 * "next" to an empty string ("") will hide the
 * corresponding link.
 *
 * If "current" is set then "prev" and "next"
 * are not implicitly set.
 * @module FooterNav
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    let componentSpec = null;
    let current = null;
    let prev = null;
    let next = null;

    if (options.hash.itemNumber) {
        componentSpec = componentSpecArticle;
    } else {
        componentSpec = componentSpecTale;
    }
    checkComponentNamedParams(componentName, componentSpec, options.hash);

    if (options.hash.itemNumber) {
        current = `SCP-${options.hash.itemNumber}`;
        prev = options.hash.prev !== undefined
            ? options.hash.prev
            : `SCP-${options.hash.itemNumber - 1}`;
        next = options.hash.next !== undefined
            ? options.hash.next
            : `SCP-${options.hash.itemNumber + 1}`;
    } else {
        current = options.hash.current;
        prev = options.hash.prev || null;
        next = options.hash.next || null;
    }

    return `\
[[div class="footer-wikiwalk-nav"]]
[[=]]
${prev ? `<< [[[${prev}]]] | ` : ''}\
${current}\
${next ? ` | [[[${next}]]] >>` : ''}
[[/=]]
[[/div]]`;
}
