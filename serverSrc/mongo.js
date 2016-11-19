import {MongoClient} from 'mongodb';

export let db = {};

export function startMongo() {
  const uriString = 'mongodb://' + process.env.MONGO_URL + '/' + process.env.MONGO_DB;

  // Use connect method to connect to the Server
  MongoClient.connect(uriString, (err, database) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected correctly to mogno");
      db.connection = database;
      db.user = database.collection('user');
      db.client = database.collection('client');
      db.code = database.collection('code');
    }
  });
}
