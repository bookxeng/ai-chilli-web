import { MongoClient } from "mongodb";

const uri = "mongodb+srv://sorathonaof2548_db_user:acCgla1TnVfBed4j@cluster0.z8ld0ke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;