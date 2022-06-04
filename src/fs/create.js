import * as fs from 'fs/promises';
import { access, constants } from 'node:fs';
export const create = async () => {

	const file = './files/fresh.txt';
	async function writeFile(file) {access(file, constants.F_OK, (err) => {
		if (err) {
			try {
		fs.writeFile(file, "I am fresh and young", 'utf8')
	} catch (error) {
		console.error('FS operation failed');
	}

		} else {console.error('FS operation failed');}
	});}

	writeFile(file)

};
create()
