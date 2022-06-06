import { Transform, pipeline } from 'stream';

export const transform = async () => {
    const reverse = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, String(chunk).split('').reverse().join('') + '\n');
        },
    });
    pipeline(process.stdin, reverse, process.stdout, (err) => {
        console.log(err);
    });
};

transform();
