const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const smsPackageSchema = new Schema({
    smsPackName: { type: String, default: 'GYM-E-DIARY-SMS-TRIAL' },
    smsPackPrice: { type: Number, default: 0 },
    smsPackQuantity: { type: Number, default: 20 },
    status: { type: Number, default: 1 }
});

const masterSmsPackage = mongoose.model('masterSmsPackage', smsPackageSchema);
module.exports = masterSmsPackage;
