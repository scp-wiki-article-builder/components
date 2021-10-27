import { checkComponentNamedParams } from 'scpwiki-handlebars-util';

const componentName = 'acsAnimation';

const componentSpec = {
    timeScale: { type: 'number', optional: true },
    timeDelay: { type: 'number', optional: true },
    acsLitePatch: { type: 'boolean', optional: true }
};

/**
 * SCP-Wiki ACS Animation component.
 * @module acsAnimation
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    checkComponentNamedParams(componentName, componentSpec, options.hash);
    const timeScale = options.hash.timeScale;
    const timeDelay = options.hash.timeDelay;

    let text = '[[include :scp-wiki:component:acs-animation]]';

    if (timeScale || timeDelay) {
        text += `
[[module CSS]]
:root {
    ${timeScale ? `--timeScale: ${timeScale};\n` : ''}\
    ${timeDelay ? `--timeDelay: ${timeDelay}s;\n` : ''}\
}
[[/module]]
`;
    }

    if (options.hash.acsLitePatch) {
        text += `\
[[module CSS]]
/*-- ACS Lite Animation Compatibility Patch --*/
.anom-bar > .bottom-box::before { display: none; }
.anom-bar > .bottom-box { box-shadow: none!important; }
div.diamond-part { clip-path: none; animation: none; box-shadow: none!important; }
@media (max-width: 480px) {
div.top-right-box { clip-path: polygon(0% -30%, 100% -30%, 100% 130%, 0% 130%); }
}
[[/module]]
`;
    }

    return text;
}
