


const ChannelsConnectionString = config.stage == "testing" ? config.mongoDB.connection : `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority&tls=true`;
const ChannelsCollectionName = config.stage == "testing" ? config.mongoDB.database : process.env.DB_DATABASE;
export const ChannelsDatabase = new MongoDB(ChannelsConnectionString, ChannelsCollectionName);


static #default_options = { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } };
constructor(connection_string, collection)
{
    this.#collection = collection;
    this.#connection = new MongoClient(connection_string, MongoDB.#default_options);
}

#client;
async client()
{
    if (this.#client) return this.#client;
    await this.#connection.connect();
    const collection_name = config.stage == "testing" ? "documents-test" : "documents";
    this.#client = this.#connection.db(this.#collection).collection(collection_name);
    console.log('Connected successfully to MongoDB');
    return this.#client;
}