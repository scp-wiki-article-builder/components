import { URL, pathToFileURL, fileURLToPath } from 'url';

import { checkComponentParam } from '@scp-wiki-article-builder/util';

const componentName = 'image';

/**
 * Registers an image file and return its path as it will be on the wiki.
 * @module image
 * @param {string} imagePath
 * @param {Handlebars.HelperOptions} options
 * @returns {Promise<string>}
 */
export default async function (imagePath, options) {
    checkComponentParam(componentName, 'string', imagePath);

    const { ImageService } = options.data.services;
    const { currentFilePath } = options.data;

    const imageUrl = new URL(imagePath, pathToFileURL(currentFilePath));
    const imageAbsolutePath = fileURLToPath(imageUrl.href);

    return ImageService.registerImage(imageAbsolutePath);
}
