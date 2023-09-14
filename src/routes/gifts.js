import mongodb from '../database/mongodb.js';

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
        const options = { sort: { "timestamp": "asc" }, limit: req.query.limit};
        return { gifts:  await mongodb.find({}, options).toArray() };
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'control-test-routes', encapsulate: false });