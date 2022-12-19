var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
let connection;
let db;

async function connectDb () {
  //  connection = await mongoClient.connect("mongodb://localhost:27017");
   connection = await mongoClient.connect(URL);

   db = connection.db("zomato_clone");
  return db;
}

async function closeConnection() {
  if(connection){
    await connection.close()
  } else {
    console.log("No Connection");
  }
}

module.exports = { connectDb, connection , db, closeConnection };
