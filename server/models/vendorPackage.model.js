const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    packName: { type: String, unique: true },
    packPrice: { type: Number },
    packDuration: { type: Number },
    durationIn: { type: String, required: true },
    packDetails: { type: String },
    status: { type: Number, default: 1 }
});

const VendorPackage = mongoose.model('VendorPackage', packageSchema);
module.exports = VendorPackage;