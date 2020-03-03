const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const invoiceInSchema = new Schema({
    accountInfo: { type: Schema.Types.ObjectId, ref: 'AccountInfo', required: true },
    transaction: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true },
    orderSummary: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productType: { type: Schema.Types.ObjectId, ref: 'ProductType', required: true },
        quantity: Number,
        priceFormat: String,
        price: Number,
        gst: Number,
        costPrice: Number,
        basicPrice: Number,
        gstValue: Number,
        priceAfterDiscount: Number,
        discountP: Number,
        discount: Number,
        selectedProductType: String,
        brandProduct: String
    }],
    date: Date,
    invoiceNumber: String,
    taxType: String,
    dataType: String,
    status: { type: Number, default: 1 }
});

const InvoiceIn = mongoose.model('InvoiceIn', invoiceInSchema);


const invoiceSaleCounterSchema = Schema({
    _id: { type: String, required: true },
    invoiceNumber: { type: Number, default: 0 }
});
const InvoiceNumberCounter = mongoose.model('InvoiceNumberCounter', invoiceSaleCounterSchema);

module.exports = {
    InvoiceIn,
    InvoiceNumberCounter
};