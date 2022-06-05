import { access, readdir, copyFile, mkdir } from 'fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const folderSource = join(__dirname, 'files/');
    const folderTarget = join(__dirname, 'files_copy/');

    const copyFiles = async (folderSource) => {
        try {
            if (
                (await checkFileExists(folderSource)) &&
                !(await checkFileExists(folderTarget))
            ) {
                await mkdir(folderTarget);
                let data;
                data = await readdir(folderSource);
                data.forEach((file) => {
                    copyFile(folderSource + file, folderTarget + file);
                });
            } else {
                throw Error('FS operation failed');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const checkFileExists = async (folderSource) => {
        return await access(folderSource, constants.F_OK)
            .then(() => true)
            .catch(() => false);
    };

    copyFiles(folderSource);
};

copy();
