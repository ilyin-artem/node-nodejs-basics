import { env } from 'process';

export const parseEnv = () => {
    const envArr = [];

    for (const envKey in env) {
        if (envKey.includes('RSS_')) {
            envArr.push([envKey, env[envKey]]);
        }
    }
    const result = envArr.map(([key, value]) => `${key}=${value}`).join('; ');
    console.log(result);
};

parseEnv();
