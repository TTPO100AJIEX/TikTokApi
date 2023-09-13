import fs from 'fs';
import path from 'path';

async function scanDirectory(app, directory)
{
    for (const filename of fs.readdirSync(directory))
    {
        const fileStats = fs.lstatSync(path.join(directory, filename));
        if (fileStats.isDirectory()) await scanDirectory(app, path.join(directory, filename));
        if (!fileStats.isFile()) continue;
        const { default: module } = await import(path.join(directory, filename));
        await app.register(module);
    }
}

async function register(app, options)
{
    await scanDirectory(app, options.routes_directory);
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'routes', encapsulate: false });