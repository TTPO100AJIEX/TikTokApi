import url from 'url';
import path from 'path';
import fastify from 'fastify';
import config from "./config.json" assert { type: "json" };

const app = fastify({
    forceCloseConnections: true,
    ignoreTrailingSlash: true,
    ignoreDuplicateSlashes: true,
    logger: config.stage == "testing",
    disableRequestLogging: true
});

const BASE_DIRECTORY = path.dirname(url.fileURLToPath(import.meta.url));
const directories = { routes_directory: path.join(BASE_DIRECTORY, "routes") };

import security from "./plugins/security.js"; await app.register(security, directories);
import utility  from "./plugins/utility.js";  await app.register(utility,  directories);
import routes   from "./plugins/routes.js";   await app.register(routes,   directories);

await app.ready();

app.listen({ port: config.website.port, host: "0.0.0.0" }, (err, address) => 
{
    if (err) throw err;
    console.info(`Server is now listening on ${address}`);
});