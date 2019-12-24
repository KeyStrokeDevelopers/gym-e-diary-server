import mongoose from 'mongoose'
require('dotenv').config()

connectToDatabase('gym-e-master');

export function connectToDatabase(dbName) {
    mongoose.connection.close()
    mongoose.connect(`${process.env.MONGO_URL}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'database connection error:'));
    db.once('open', () => {
        console.log(`database is connected successfully to ${dbName}`)
    });
}