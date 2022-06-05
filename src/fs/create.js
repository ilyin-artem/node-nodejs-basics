import { access, writeFile } from 'fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
export const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const file = join(__dirname, '/files/fresh.txt');
    console.log(file);

    const createFile = async (file) => {
        try {
            if (!(await checkFileExists(file))) {
                await writeFile(file, 'I am fresh and young', 'utf8');
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

    createFile(file);
};

create();
