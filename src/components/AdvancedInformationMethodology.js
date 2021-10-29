import { checkComponentNamedParams } from '@scp-wiki-article-builder/util';

const componentName = 'AdvancedInformationMethodology';

const componentSpecBoth = {
    blocks: { type: 'string', optional: true },
    itemNumber: 'number',
    level: 'string',
    containmentClass: 'string',
    disruptionClass: 'string',
    site: 'string',
    dir: 'string',
    head: 'string',
    mtf: 'string'
};

const componentSpecTop = {
    blocks: { type: 'string', optional: true },
    itemNumber: 'number',
    level: 'string',
    containmentClass: 'string',
    disruptionClass: 'string',
    site: { type: 'string', optional: true },
    dir: { type: 'string', optional: true },
    head: { type: 'string', optional: true },
    mtf: { type: 'string', optional: true }
};

const componentSpecBottom = {
    blocks: { type: 'string', optional: true },
    itemNumber: { type: 'number', optional: true },
    level: { type: 'string', optional: true },
    containmentClass: { type: 'string', optional: true },
    disruptionClass: { type: 'string', optional: true },
    site: 'string',
    dir: 'string',
    head: 'string',
    mtf: 'string'
};

/**
 * SCP-Wiki Advanced Information Methodology component,
 * @module AdvancedInformationMethodology
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    const blocks = options.hash.blocks
            && ['both', 'top', 'bottom'].find(v => v === options.hash.blocks)
        ? options.hash.blocks
        : 'both';

    let componentSpec = null;
    let blocksParam = null;

    switch (blocks) {
        case 'both':
            componentSpec = componentSpecBoth;
            blocksParam = '';
            break;

        case 'top':
            componentSpec = componentSpecTop;
            blocksParam = 'blocks=-';
            break;

        case 'bottom':
            componentSpec = componentSpecBottom;
            blocksParam = 'blocks=!';
            break;
    }

    checkComponentNamedParams(componentName, componentSpec, options.hash);

    return `\
[[include :scp-wiki:component:advanced-information-methodology ${blocksParam}
${options.hash.itemNumber ? `|XXXX=${options.hash.itemNumber}\n` : ''}\
${options.hash.level ? `|lv=${options.hash.level}\n` : ''}\
${options.hash.containmentClass ? `|cc=${options.hash.containmentClass}\n` : ''}\
${options.hash.disruptionClass ? `|dc=${options.hash.disruptionClass}\n` : ''}\
${options.hash.site ? `|site=${options.hash.site}\n` : ''}\
${options.hash.dir ? `|dir=${options.hash.dir}\n` : ''}\
${options.hash.head ? `|head=${options.hash.head}\n` : ''}\
${options.hash.mtf ? `|mtf=${options.hash.mtf}\n` : ''}\
]]`;
}
