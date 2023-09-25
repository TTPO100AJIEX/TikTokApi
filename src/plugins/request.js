import formbody from "@fastify/formbody";

async function register(app, options)
{
    /*----------------------------------FORMBODY----------------------------------*/
    await app.register(formbody, { bodyLimit: 1048576 });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'security', encapsulate: false });