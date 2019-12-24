import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const gymInfoSchema = new Schema({
    branchPic: { type: String, default: null },
    branchLogo: { type: String, default: 'no' },
    branchTerms: { type: String },
    branchName: { type: String, default: null },
    branchAddress: { type: String, default: null },
    branchCity: { type: String, default: null },
    branchState: { type: String, default: null },
    branchPin: { type: String, default: null },
    branchContact: { type: String, required: true, unique: true },
    branchEmail: { type: String, default: null, unique: true },
    branchDetails: { type: String, default: null },
    branchBillCode: { type: String, default: null },
    regFee: { type: Number, default: 0 },
    autoBirth: { type: Boolean, default: false },
    autoAnniv: { type: Boolean, default: false },
    autoExpired: { type: Boolean, default: true },
    appId: { type: String, default: null },
    authId: { type: String, default: null },
    smsApi: { type: String, default: null },
    smsBalance: { type: Number, default: 0 },

});

export default model('GymInfo', gymInfoSchema);