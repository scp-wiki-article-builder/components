import Handlebars from 'handlebars';

import { checkComponentHasChildren } from '@scp-wiki-article-builder/util';

const componentName = 'CurrentDateProvider';

/**
 * Block component allowing to use the current date as
 * a private variable named "@currentDate". The date is
 * in the following format: <year>/<month>/<day>.
 *
 * Internally uses the ListPages Wikidot module in
 * the same manner as in SCP-5251.
 * @module CurrentDateProvider
 * @param {Handlebars.HelperOptions} options
 * @returns {string}
 */
export default function (options) {
    checkComponentHasChildren(componentName, options);

    const data = Handlebars.createFrame(options.data || {});
    data.currentDate = '%%updated_at|%Y/%m/%d%%';

    return `\
[[module ListPages category="*" limit="1" updated_at="last 3 day" order="updated_at desc"]]
${options.fn(this, { data })}\
[[/module]]
`;
}
