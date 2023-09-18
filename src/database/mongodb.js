import mongodb from 'mongodb';
import config from "../config.json" assert { type: "json" };

const options = { serverApi: { version: mongodb.ServerApiVersion.v1, strict: true, deprecationErrors: true } };
const connection = new mongodb.MongoClient(config.mongoDB.connection, options);

connection.connect().then(() => console.log(`Started mongodb`));
export default connection.db(config.mongoDB.database).collection("gifts");