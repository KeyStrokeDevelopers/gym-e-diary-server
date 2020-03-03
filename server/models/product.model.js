const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    brand: { type: Schema.Types.ObjectId, ref: 'BrandUnit', required: true },
    model: { type: String },
    product: { type: Schema.Types.ObjectId, ref: 'ProductType', required: true },
    measuringUnit: { type: Schema.Types.ObjectId, ref: 'BrandUnit', required: true },
    modelNo: { type: String },
    quantity: { type: Number, default: 0 },
    minimumQty: { type: Number },
    costPrice: { type: Number },
    sellingPrice: { type: Number },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', productSchema);