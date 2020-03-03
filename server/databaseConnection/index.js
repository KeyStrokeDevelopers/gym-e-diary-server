// const mongoose =require('mongoose')
// // const mongoDBErrors =require('mongoose-mongodb-errors'
// require('dotenv').config()

// mongoose.Promise = global.Promise;
// //mongoose.plugin(mongoDBErrors);

// connectedToDatabase('gym-e-master');

// export function connectedToDatabase(dbName) {
//     mongoose.connection.close()
//     return new Promise((resolve, rejects) => {
//         mongoose.connect(`${process.env.MONGO_URL}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
//         mongoose.set('useCreateIndex', true);
//         var db = mongoose.connection;
//         db.on('error', () => {
//             console.error.bind(console, 'database connection error:')
//             rejects(false);
//         });
//         db.once('open', () => {
//             console.log(`database is connected successfully to ${dbName}`)
//             resolve(true);
//         });
//     })
// }


const mongoose = require('mongoose')
require('dotenv').config()

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: false
};
const initDbConnection = () => {
  const db = mongoose.createConnection(`${process.env.MONGO_URL}/gym-e-master`, clientOption);

  db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
  db.once("open", function () {
    console.log("Database is connected successfully to gym-e-master");
  });
  return db;
};

module.exports = {
  initDbConnection
};