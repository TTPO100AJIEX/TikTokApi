import { WebcastPushConnection } from 'tiktok-live-connector';

import config from "../config.json" assert { type: "json" };

const tiktok = new WebcastPushConnection(config.tiktok.username);
const state = await tiktok.connect();
console.log(`Connected to tiktok roomId ${state.roomId}`);
tiktok.on('gift', data =>
{
    //try { manager.registerGift(data.giftName, data.diamondCount); }
    //catch(err) { console.error(err); }
});