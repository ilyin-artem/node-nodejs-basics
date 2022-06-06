import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';

export const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const srcFile = join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = join(__dirname, 'files', 'archive.gz');

    pipeline(
        fs.createReadStream(srcFile),
        zlib.createGzip(),
        fs.createWriteStream(destPath),
        (err) => {
            if (err) {
                console.error('Error', err);
            } else {
                console.log('done');
            }
        }
    );
};
compress();
