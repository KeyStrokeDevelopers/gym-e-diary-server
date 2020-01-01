import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const purposeSchema = new Schema({
    purposeName: { type: String, required: true }
});

module.exports = mongoose.model('Purpose', purposeSchema);