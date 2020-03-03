const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSummarySchema = new Schema({
    invoiceInfo: { type: Schema.Types.ObjectId, ref: 'InvoiceIn', required: true },
    orderSummary: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, productType: { type: Schema.Types.ObjectId, ref: 'ProductType', required: true },
        quantity: Number,
        priceFormat: String,
        price: Number,
        gst: Number,
        costPrice: Number,
        basicPrice: Number,
        gstValue: Number,
        priceAfterDiscount: Number,
        discountP: Number,
        discount: Number
    }],
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('OrderSummary', orderSummarySchema);