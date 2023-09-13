async function register(app, options)
{
    const SCHEMA =
    {
        params:
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
                type: "array",
                items:
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
                                required: [ "gifts" ],
                                additionalProperties: false,
                                properties:
                                {
                                    "name": { type: "string" },
                                    "amount": { type: "integer" },
                                    "price": { type: "integer" }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    app.get("/gifts", { schema: SCHEMA }, async (req, res) =>
    {
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'control-test-routes', encapsulate: false });