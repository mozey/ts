import * as httpSamples from './http';
import * as restSamples from './rest';
import * as cm from './common';

export class Examples {
    async run() {
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
}

