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
    app.get("/", (req, res) => res.render("main.ejs"));
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'account-routes', encapsulate: false });