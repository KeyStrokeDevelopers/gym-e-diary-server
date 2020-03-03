const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
    paymentMethod: { type: String, required: true, unique: true },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);