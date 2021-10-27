import Handlebars from 'handlebars';

import { checkComponentNamedParams, checkComponentHasChildren } from 'scpwiki-handlebars-util';

const componentName = 'Info';

const componentSpec = {
    standalone: { type: 'boolean', optional: true }
};

/**
 * SCP-Wiki Info Module component.
 * @module Info
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    checkComponentHasChildren(componentName, options);
    checkComponentNamedParams(componentName, componentSpec, options.hash);

    const standalone = options.hash.standalone === true;
    const data = Handlebars.createFrame(options.data || {});
    data['info-standalone'] = standalone;

    return `\
[[include :scp-wiki:info:start${standalone ? '-standalone' : ''}]]
${options.fn(this, { data })}
[[include :scp-wiki:info:end${standalone ? '-standalone' : ''}]]
`;
}
