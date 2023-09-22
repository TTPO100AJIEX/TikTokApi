import tiktok from "../tiktok/index.js";

async function register(app, options)
{
    const SCHEMA =
    {
        body:
        {
            type: "object",
            required: [ "username" ],
            additionalProperties: false,
            properties:
            {
                "username": { type: "string" }
            }
        },
    };

    app.post("/account", { schema: SCHEMA }, (req, res) => tiktok.setAccount(req.body.username));
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'account-routes', encapsulate: false });