import { parentPort, workerData } from 'worker_threads';

import {
    buildWithNoErrorHandling,
    loadBuildConfig
} from '@scp-wiki-article-builder/engine';

/**
 * Builds the sub-project and returns the generated text.
 * @param {string} configPath
 * @returns {{ text: string | null, error: any }}
 */
const buildSubProjectAsync = async (configPath) => {
    let text = null;
    let error = null;

    try {
        const options = await loadBuildConfig(configPath);
        text = await buildWithNoErrorHandling(options, configPath);
    } catch(e) {
        error = e;
    }

    return {
        text,
        error
    };
};

const { configPath } = workerData;

parentPort.once('message', async ({ port, signal }) => {
    const result = await buildSubProjectAsync(configPath);
    port.postMessage(result);
    port.close();
    // Signal the completion of the task,
    Atomics.store(signal, 0, 1);
    Atomics.notify(signal, 0);
});
