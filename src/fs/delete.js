import { access, unlink } from 'fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
export const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const file = join(__dirname, './files/fileToRemove.txt');

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
