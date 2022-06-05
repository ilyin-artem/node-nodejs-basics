import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const spawnChildProcess = async (args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const scriptFile = join(__dirname, 'files', 'script.js');
    const childProcess = spawn('node', [scriptFile, args]);

    childProcess.stdout.pipe(process.stdout);
    process.stdin.pipe(childProcess.stdin);
};

spawnChildProcess(process.argv);
