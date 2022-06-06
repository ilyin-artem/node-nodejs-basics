import { access, rename as renameFile } from 'fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileSource = join(__dirname, 'files/wrongFilename.txt');
    const fileTarget = join(__dirname, 'files/properFilename.md');

    const renameFiles = async (fileSource, fileTarget) => {
        try {
            if (
                (await checkFileExists(fileSource)) &&
                !(await checkFileExists(fileTarget))
            ) {
                await renameFile(fileSource, fileTarget);
            } else {
                throw Error('FS operation failed');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const checkFileExists = async (fileSource) => {
        return await access(fileSource, constants.F_OK)
            .then(() => true)
            .catch(() => false);
    };

    renameFiles(fileSource, fileTarget);
};

rename();
