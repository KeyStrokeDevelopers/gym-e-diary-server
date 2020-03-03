const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: Number,
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', productSchema);