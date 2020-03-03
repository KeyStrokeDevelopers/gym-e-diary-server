const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productTypeSchema = new Schema({
    productType: { type: String, required: true, unique: true },
    hsnCode: { type: String },
    gst: { type: Number },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('ProductType', productTypeSchema);