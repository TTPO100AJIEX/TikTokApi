import tiktok from 'tiktok-live-connector';
import config from "../config.json" assert { type: "json" };

const connection = new tiktok.WebcastPushConnection(config.tiktok.username);

const state = await connection.connect();
console.log(`Connected to tiktok roomId ${state.roomId}`);

connection.on('gift', data =>
{
    console.log(data);
    //try { manager.registerGift(data.giftName, data.diamondCount); }
    //catch(err) { console.error(err); }
});

async function register(app, options)
{
    const SCHEMA =
    {
    };

    app.post("/account", { schema: SCHEMA }, async (req, res) =>
    {
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'account-routes', encapsulate: false });