const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'AddMember' },
    accountInfo: { type: Schema.Types.ObjectId, ref: 'AccountInfo' },
    description: { type: String },
    amount: { type: Number },
    transactionStatus: { type: String },
    paymentMode: { type: String },
    paymentModeDescription: { type: Schema.Types.ObjectId, ref: 'PaymentMethod' },
    transactionDate: { type: Date, default: new Date() },
    transactionType: { type: String, required: true },
    status: { type: Number, default: 1 }

});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;