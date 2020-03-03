const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gymInfoSchema = new Schema({
    printLogo: { type: Boolean, default: true },
    branchLogo: { type: String, default: null },
    branchTerms: { type: String },
    branchName: { type: String, default: null },
    branchAddress: { type: String, default: null },
    branchCity: { type: String, default: null },
    branchState: { type: String, default: null },
    branchPin: { type: String, default: null },
    branchContact: { type: String, required: true, unique: true },
    branchAltContact: { type: String, default: null },
    branchEmail: { type: String, default: null, unique: true },
    branchDetails: { type: String, default: null },
    regFee: { type: Number, default: 0 },
    autoBirth: { type: Boolean, default: false },
    autoAnniv: { type: Boolean, default: false },
    autoExpiring: { type: Boolean, default: true },
    autoExpired: { type: Boolean, default: true },
    isStaffAttendance: { type: Boolean, default: false },
    isMemberAttendance: { type: Boolean, default: false },
    appId: { type: String, default: null },
    authId: { type: String, default: null },
    smsApi: { type: String, default: null },
    gstNumber: { type: Number },
    smsBalance: { type: Number, default: 10 },
    biometric: { type: Boolean, default: false },
    walletBalance: { type: Number, default: 0 },
    membershipTC: String,
    billingTC: String,
    status: { type: Number, default: 1 }
});

const GymInfo = mongoose.model('GymInfo', gymInfoSchema);
module.exports = GymInfo;