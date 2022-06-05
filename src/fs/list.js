import { access, readdir } from 'fs/promises';
import { constants } from 'node:fs';

export const list = async () => {
    const dirName = './files/';

    const listDir = async (dirName) => {
        try {
            if (await checkFileExists(dirName)) {
                let data;
                data = await readdir(dirName);
                data.forEach((file) => {
                    console.log(file);
                });
            } else {
                throw Error('FS operation failed');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const checkFileExists = async (dirName) => {
        return await access(dirName, constants.F_OK)
            .then(() => true)
            .catch(() => false);
    };

    listDir(dirName);
};
list();
