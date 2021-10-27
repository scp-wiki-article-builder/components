import { checkComponentParam } from 'scpwiki-handlebars-util';

const componentName = 'footerNav';

/**
 * SCP-Wiki footer navigation links.
 * @module footerNav
 * @param {number} itemNumber
 * @returns {string}
 */
export default (itemNumber) => {
    checkComponentParam(componentName, 'number', itemNumber);

    return `\
[[div class="footer-wikiwalk-nav"]]
[[=]]
<< [[[SCP-${itemNumber - 1}]]] | SCP-${itemNumber} | [[[SCP-${itemNumber + 1}]]] >>
[[/=]]
[[/div]]`;
};
