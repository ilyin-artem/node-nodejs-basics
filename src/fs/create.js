import { access, writeFile } from 'fs/promises';
import { constants } from 'node:fs';
export const create = async () => {
    const file = './files/fresh.txt';

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
