const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const masterInfoSchema = new Schema({
    branchContact: { type: String, default: null, unique: true, required: true },
    newDbName: { type: String, default: null, unique: true, required: true },
    biometricId: { type: String, default: 'false' },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('MasterInfo', masterInfoSchema);

