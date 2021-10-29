import { checkComponentNamedParams } from '@scp-wiki-article-builder/util';

const componentName = 'AnomalyClassBar';

const componentSpec = {
    itemNumber: 'number',
    clearance: 'number',
    containerClass: 'string',
    secondaryClass: 'string',
    secondaryIcon: { type: 'string', optional: true },
    disruptionClass: 'string',
    riskClass: 'string'
};

/**
 * SCP-Wiki anomaly-class-bar module
 * @module AnomalyClassBar
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    checkComponentNamedParams(componentName, componentSpec, options.hash);

    return `\
[[include :scp-wiki:component:anomaly-class-bar-source
|item-number= ${options.hash.itemNumber}
|clearance= ${options.hash.clearance}
|container-class= ${options.hash.containerClass}
|secondary-class= ${options.hash.secondaryClass}
${options.hash.secondaryIcon
    ? `|secondary-icon= ${options.hash.secondaryIcon}\n` : ''}\
|disruption-class= ${options.hash.disruptionClass}
|risk-class= ${options.hash.riskClass}
]]`;
}
