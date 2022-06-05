import * as fs from 'fs';
import * as path from 'path';
export const read = async () => {
    currentFile = path.join(__dirname, 'text.txt');

    const stream = fs.createReadStream(currentFile, 'utf-8');
    let data = '';
    stream.on('data', (chunk) => (data += chunk));
    stream.on('end', () => console.log(data));
    stream.on('error', (error) => console.log('Error', error.message));
};

read();
