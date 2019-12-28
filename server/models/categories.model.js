import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryType: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('Category', categorySchema);