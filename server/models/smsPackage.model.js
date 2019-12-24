import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const smsPackageSchema = new Schema({
    smsPackName: { type: String, default: 'GYM-E-DIARY-SMS-TRIAL' },
    smsPackPrice: { type: Number, default: 0 },
    smsPackQuantity: { type: Number, default: 20 },
    status: { type: Number, default: 1 }
});

export default model('smsPackage', smsPackageSchema);