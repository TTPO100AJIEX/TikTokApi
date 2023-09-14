import tiktok from 'tiktok-live-connector';
import mongodb from '../database/mongodb.js';

var connection = undefined;
async function registerGift(gift)
{
    console.log(`Received gift ${gift.giftName}`);
    try { await mongodb.insertOne(gift); } catch(err) { console.error(err); }
}

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
        if (connection) connection.disconnect();
        connection = new tiktok.WebcastPushConnection(req.body.username);
        const state = await connection.connect();
        console.log(`Connected to tiktok ${req.body.username} roomId ${state.roomId}`);
        connection.on('gift', registerGift);
        await mongodb.deleteMany({});
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'account-routes', encapsulate: false });