import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/gym-e-master', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', () => {
    console.log('database is connected successfully to gym-e-Master')
});