const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'AddMember', required: true },
    date: Date,
    amount: Number,
    paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    description: String,
    status: { type: Number, default: 1 }

});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;