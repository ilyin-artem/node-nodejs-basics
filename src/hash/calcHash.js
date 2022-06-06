import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';

export const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const hash = createHash('sha256');
    const fileSource = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const readingStream = createReadStream(fileSource);
    readingStream.on('readable', () => {
        const data = readingStream.read();
        if (data) hash.update(data);
        else {
            console.log(hash.digest('hex'));
        }
    });
};

calculateHash();
