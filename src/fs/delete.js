import { access, unlink } from 'fs/promises';
import { constants } from 'node:fs';
export const remove = async () => {
    const file = './files/fileToRemove.txt';

    const deleteFile = async (file) => {
        try {
            if (await checkFileExists(file)) {
                await unlink(file);
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

    deleteFile(file);
};

remove();
