import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
    paymentMethod: { type: String, required: true },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);