import { checkComponentParam } from 'scpwiki-handlebars-util';

const componentName = 'FooterNav';

/**
 * SCP-Wiki footer navigation links.
 * @module FooterNav
 * @param {number} itemNumber
 * @returns {string}
 */
export default function (itemNumber) {
    checkComponentParam(componentName, 'number', itemNumber);

    return `\
[[div class="footer-wikiwalk-nav"]]
[[=]]
<< [[[SCP-${itemNumber - 1}]]] | SCP-${itemNumber} | [[[SCP-${itemNumber + 1}]]] >>
[[/=]]
[[/div]]`;
}
