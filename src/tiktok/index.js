import tiktok from 'tiktok-live-connector';
import mongodb from "../database/mongodb.js";

var connection = undefined;
import disconnected from './disconnected.js';
import registerGift from './registerGift.js';

export async function setAccount(username)
{
    if (connection) connection.disconnect();
    connection = new tiktok.WebcastPushConnection(username);

    connection.on('gift', registerGift);
    connection.on('streamEnd', disconnected);
    connection.on('disconnected', disconnected);

    const state = await connection.connect();
    console.log(`Connected to tiktok ${username} roomId ${state.roomId}`);
    
    await mongodb.deleteMany({});
}

export function getGifts(limit)
{
    const options = { sort: { "timestamp": "asc" }, limit };
    return mongodb.find({}, options).toArray();
}

export function getUsername()
{
    return connection?.getState()?.roomInfo?.owner?.display_id;
}

export default { setAccount, getGifts, getUsername };