import { access, readFile } from 'fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
export const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const file = join(__dirname, './files/fileToRead.txt');

    const readFilName = async (file) => {
        try {
            if (await checkFileExists(file)) {
                let data;
                data = await readFile(file);

                console.log(data.toString());
            } else {
                throw Error('FS operation failed');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const checkFileExists = async (file) => {
        return await access(file, constants.F_OK)
            .then(() => true)
            .catch(() => false);
    };

    readFilName(file);
};

read();
