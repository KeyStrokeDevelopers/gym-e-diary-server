import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const gymInfoSchema = new Schema({
    firmId: { type: String, default: null},
    branchId: { type: String, default: null},
    branchPic: { type: String, default: null},
    branchLogo: { type: String, default: 'no'},
    branchTerms: { type: String },
    branchName: { type: String, default: null},
    branchAddress: { type: String, default: null},
    branchCity: { type: String, default: null},
    branchState: { type: String, default: null},
    branchPin: { type: String, default: null},
    branchContact: { type: String, required: true , unique: true},
    branchEmail: { type: String, default: null, unique: true},
    branchDetails: { type: String, default: null},
    branchBillCode: { type: String, default: null},
    branchLimit: { type: Number, default: null},
    regFee: { type: Number, default: 0},
    autoBirth: { type: Boolean, default: false},
    autoAnniv: { type: Boolean, default: false},
    autoExpired: { type: Boolean, default: true},
    registrationDate: { type: Date, default: Date.now},
    expiringDate: { type: Date, default: Date.now + (7 * 86400000)},
    status: { type: String, default: null},
    code: { type: String, default: null} 
});

module.exports = mongoose.model('GymInfo', gymInfoSchema);