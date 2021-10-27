const componentName = 'infoMore';

/**
 * SCP-Wiki Info Module component ('more' block).
 * @module InfoMore
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    const standalone = options.data
        ? options.data['info-standalone'] === true
        : false;

    return `[[include :scp-wiki:info:more${standalone ? '-standalone' : ''}]]`;
}
