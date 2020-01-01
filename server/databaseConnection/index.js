import mongoose from 'mongoose'
// import mongoDBErrors from 'mongoose-mongodb-errors'
require('dotenv').config()

mongoose.Promise = global.Promise;
//mongoose.plugin(mongoDBErrors);

connectedToDatabase('gym-e-master');

export function connectedToDatabase(dbName) {
    mongoose.connection.close()
    return new Promise((resolve, rejects) => {
        mongoose.connect(`${process.env.MONGO_URL}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        var db = mongoose.connection;
        db.on('error', () => {
            console.error.bind(console, 'database connection error:')
            rejects(false);
        });
        db.once('open', () => {
            console.log(`database is connected successfully to ${dbName}`)
            resolve(true);
        });
    })
}