import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', () => {
    console.log('database is connected successfully')
});