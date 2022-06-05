import * as fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
export const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const currentFile = join(__dirname, 'files/fileToRead.txt');

    const stream = fs.createReadStream(currentFile, 'utf-8');
    let data = '';
    stream.on('data', (chunk) => (data += chunk));
    stream.on('end', () => process.stdout.write(data));
    stream.on('error', (error) => process.stdout.write('Error', error.message));
};

read();
