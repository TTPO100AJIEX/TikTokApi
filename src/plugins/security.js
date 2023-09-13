import config from "../config.json" assert { type: "json" };

import cors from "@fastify/cors";

async function register(app, options)
{
    /*----------------------------------CORS----------------------------------*/
    await app.register(cors,
    {
        origin: `https://${config.website.host}`,
        methods: 'GET,HEAD,POST',
        maxAge: 300,
        optionsSuccessStatus: 204,
        preflight: true,
        strictPreflight: true,
        hideOptionsRoute: true
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'security', encapsulate: false });