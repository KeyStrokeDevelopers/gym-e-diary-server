import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const bankSchema = new Schema({
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    ifsc: { type: String, required: true },
    upi: { type: String, unique: true },
    accountHolder: { type: String, required: true },
    swipe: { type: Boolean, default: false },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('Bank', bankSchema);