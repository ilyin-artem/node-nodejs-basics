import os from 'os';
import { Worker } from 'worker_threads';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const workerPath = join(__dirname, 'worker.js');

    const CPUQty = os.cpus().length;

    const promises = Array(CPUQty)
        .fill(null)
        .map((_, idx) => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(workerPath, { workerData: 10 + idx });
                worker.on('message', (message) => {
                    resolve(message);
                    worker.on('error', reject);
                    worker.on('exit', (code) => {
                        if (code !== 0)
                            reject(
                                new Error(
                                    `Worker stopped with exit code ${code}`
                                )
                            );
                    });
                });
            });
        });
    const result = await Promise.all(promises);
    console.log(result);
    return result;
};

performCalculations();
