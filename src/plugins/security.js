import config from "../config.json" assert { type: "json" };

import cors from "@fastify/cors";
import rate_limit from "@fastify/rate-limit";

async function register(app, options)
{
    /*----------------------------------RATE LIMIT----------------------------------*/
    await app.register(rate_limit, {
        global: true,
        max: config.stage == "testing" ? 1000000 : 100,
        timeWindow: 60000,
        ban: config.stage == "testing" ? 1500000 : 150,
        continueExceeding: true,
        addHeadersOnExceeding: { 'x-ratelimit-limit': false, 'x-ratelimit-remaining': false, 'x-ratelimit-reset': false, 'retry-after': false },
        addHeaders: { 'x-ratelimit-limit': false, 'x-ratelimit-remaining': true, 'x-ratelimit-reset': false, 'retry-after': true },
        onExceeded: (req) => console.info(`Rate Limit exceeded by ${req.ip}`)
    });


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