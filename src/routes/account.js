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

    app.post("/account", { schema: SCHEMA }, async (req, res) =>
    {
        const response = await tiktok.setAccount(req.body.username);
        if (req.headers['content-type'] == 'application/x-www-form-urlencoded') return res.redirect("/");
        return response;
    });
    app.get("/", (req, res) => res.render("main.ejs", { username: tiktok.getUsername() }));
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'account-routes', encapsulate: false });