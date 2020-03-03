const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const accessSchema = new Schema({
    accessLevel: { type: String, default: null },
    controls: { type: String, default: null },
    // dated: { type: Date, default: new Date().getTime() },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('Access', accessSchema);