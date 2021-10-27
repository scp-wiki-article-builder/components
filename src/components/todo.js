import colors from 'colors';

/**
 * Groups TODOs in a formatted manner.
 * Outputs a formatted list of the TODOs and emits warnings.
 * @module todo
 * @param  {...any} items
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function () {
    const items = Array.prototype.slice.call(arguments, 0, -1);
    let text = '';

    if (items.length > 0) {
        text += 'TODO:\n';
        items.forEach(item => {
            text += `- ${item}\n`;

            console.warn(`TODO: ${item}`.yellow);
        });
    } else {
        console.warn('A TODO with no items was found.'.yellow);
    }

    return text;
}
