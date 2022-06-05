import { access, readdir, copyFile, mkdir } from 'fs/promises';
import { constants } from 'node:fs';

export const copy = async () => {
    // implement function that copies folder files
    // with all its content into folder files_copy at the same level
    // (if files folder doesn't exists or files_copy has already been created Error with message FS operation failed must be thrown)
    const folderSource = 'files/';
    const folderTarget = 'files_copy/';

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
