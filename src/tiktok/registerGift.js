import mongodb from "../database/mongodb.js";

export default async function registerGift(gift)
{
    console.log(`Received gift ${gift.giftName}`);
    try { await mongodb.insertOne(gift); } catch(err) { console.error(err); }
}