import { URL } from 'url';
import {
    receiveMessageOnPort,
    Worker,
    MessageChannel
} from 'worker_threads';

import {
    checkComponentParam,
    RuntimeException
} from '@scp-wiki-article-builder/util';

const componentName = 'sub';

/**
 * Compiles and returns a sub-project article.
 * @module sub
 * @param {string} subProjectName
 * @param {Handlebars.HelperOptions} options
 */
export default function (subProjectName, options) {
    checkComponentParam(componentName, 'string', subProjectName);

    const subProjectConfigPath = options.data.config.subProjects[subProjectName];
    if (!subProjectConfigPath) {
        throw new RuntimeException(
            `Cannot find sub-project named "${subProjectName}".`,
            'Is this the correct name?'
        );
    }

    const result = buildSubProject(subProjectConfigPath);
    if (result.error) {
        throw result.error;
    }

    return result.text;
}

/**
 * Builds a sub-project in a worker and returns the generated text.
 * @param {string} configPath
 * @returns {{ text: string | null, error: any }}
 */
const buildSubProject = (configPath) => {
    let result = null;
    // We create a message channel to be able to use receiveMessageOnPort().
    const { port1, port2 } = new MessageChannel();
    // This array will be used for signaling between the worker and the main thread.
    const signal = new Int32Array(new SharedArrayBuffer(4));
    signal[0] = 0;

    // We create and start the worker thread.
    const worker = new Worker(new URL('../workers/subWorker.js', import.meta.url), {
        workerData: {
            configPath
        }
    });

    try {
        // We pass it the port to reach us back and the shared array.
        worker.postMessage({ port: port1, signal }, [ port1 ])

        // We wait for it to compile the sub-project and send us the result.
        Atomics.wait(signal, 0, 0);
        result = receiveMessageOnPort(port2).message;
    } finally {
        // We shutdown the worker thread.
        worker.unref();
    }

    return result;
};
