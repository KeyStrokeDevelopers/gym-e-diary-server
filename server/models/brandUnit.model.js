const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const brandUnitSchema = new Schema({
    entryType: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('BrandUnit', brandUnitSchema);