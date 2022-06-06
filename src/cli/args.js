import { argv } from 'process';

export const parseArgs = () => {
    const argsArr = [];

    for (let i = 1; i < argv.length; i++) {
        const key = argv[i];
        const value = argv[i + 1];
        if (key.startsWith('--')) {
            argsArr.push([key, value]);
            i++;
        }
    }

    const result = argsArr
        .map(([key, value]) => `${key} is ${value}`)
        .join(', ');

    console.log(result);
};

parseArgs();
