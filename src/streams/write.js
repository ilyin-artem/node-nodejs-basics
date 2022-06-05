import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileName = join(__dirname, 'files/fileToWrite.txt');

    const writingStream = fs.createWriteStream(fileName, { flags: 'a' });
    process.stdin.on('data', (chunk) => {
        writingStream.write(chunk);
    });
};

write();
