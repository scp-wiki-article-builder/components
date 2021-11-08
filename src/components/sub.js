import {
    checkComponentParam,
    RuntimeException,
} from '@scp-wiki-article-builder/util';

import {
    buildWithNoErrorHandling,
    loadBuildConfig
} from '@scp-wiki-article-builder/engine';

const componentName = 'sub';

/**
 * Compiles and returns a sub-project article.
 * @module sub
 * @param {string} subProjectName
 * @param {Handlebars.HelperOptions} options
 * @returns {Promise<string>}
 */
export default async function (subProjectName, options) {
    checkComponentParam(componentName, 'string', subProjectName);

    const subProjectConfigPath = options.data.config.subProjects[subProjectName];
    if (!subProjectConfigPath) {
        throw new RuntimeException(
            `Cannot find sub-project named "${subProjectName}".`,
            'Is this the correct name?'
        );
    }

    return await buildSubProject(
        subProjectConfigPath,
        options.data.config,
        options.data.services
    );
}

/**
 * Builds a sub-project in a worker and returns the generated text.
 * @param {string} configPath
 * @param {any} parentBuildOptions
 * @param {any} services
 * @returns {Promise<string>}
 */
const buildSubProject = async (configPath, parentBuildOptions, services) => {
    const buildOptions = await loadBuildConfig(configPath);
    const { wikiName, pageName } = parentBuildOptions;
    return await buildWithNoErrorHandling(
        buildOptions,
        configPath,
        {
            wikiName,
            pageName,
        },
        services
    );
};
