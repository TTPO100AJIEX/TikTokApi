import tiktok from "../tiktok/index.js";

function giftNameToId(giftName)
{
    switch (giftName)
    {
        case "Rose": return 0;
        case "Chili": return 1;
        case "TikTok": return 2;
        case "Panda": return 3;
        case "Tiny Diny": return 4;
        case "Ice Cream Cone": return 5;
        case "GG": return 6;
        case "Fire": return 7;
        case "Sports Car": return 8;
        case "Hat and Mustache": return 9;
        default: return 10;
    }
}

async function register(app, options)
{
    const SCHEMA =
    {
        query:
        {
            type: "object",
            required: [ "limit" ],
            additionalProperties: false,
            properties:
            {
                "limit": { type: "integer", minimum: 0, maximum: 100 }
            }
        },
        response:
        {
            200:
            {
                type: "object",
                required: [ "gifts" ],
                additionalProperties: false,
                properties:
                {
                    "gifts":
                    {
                        type: "array",
                        items:
                        {
                            type: "object",
                            additionalProperties: false,
                            properties:
                            {
                                "id": { type: "integer", minimum: 0, maximum: 10 },
                                "giftName": { type: "string" },
                                "diamondCount": { type: "integer" }
                            }
                        }
                    }
                }
            }
        }
    };

    app.get("/gifts", { schema: SCHEMA }, async (req, res) =>
    {
        const gifts = await tiktok.getGifts(req.query.limit);
        gifts.forEach(gift => gift.id = giftNameToId(gift.giftName));
        return { gifts };
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'gifts-routes', encapsulate: false });