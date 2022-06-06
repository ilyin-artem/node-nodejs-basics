import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
export const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const srcFile = join(__dirname, 'files', 'archive.gz');
    const destPath = join(__dirname, 'files', 'fileToCompress.txt');

    pipeline(
        fs.createReadStream(srcFile),
        zlib.createGunzip(),
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
decompress();
