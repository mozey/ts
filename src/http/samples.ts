import * as httpSamples from './http';
import * as restSamples from './rest';
import * as cm from './common';

async function run() {
    try {
        await httpSamples.run();
        await restSamples.run();
    }
    catch (err) {
        if (cm.isError(err)) {
            console.error('Failed');
            console.error(err.message);
        }
    }
}

run();
