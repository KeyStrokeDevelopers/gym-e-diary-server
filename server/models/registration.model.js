import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    contactNumber: { type: String, required: true },
    memberName: { type: String, required: true },
    favourTitle: { type: String, required: true },
    favourOf: { type: String },
    alternatContact: { type: String },
    email: { type: String },
    dob: { type: Date },
    age:{type: Number},
    postalAdd: {type: String},
    occupation: {type: String},
    bloodGroup: {type: String},
    maritalStatus: {type: String},
    anniversary: {type: Date},
    purpose: {type: String},
    query: {type: String},
    package: {type: String},
    addOnClass: {type: String},
    packageDisc: {type: Number},
    classDisc: {type: Number},
    payable: {type: Number},
    paidAmount: {type: Number},
    balance: {type: Number},
    paymentMode: {type: String},
    activation: {type: Date},
    fingerCode: {type: String},
    referredBy: {type: String}
});

module.exports = mongoose.model('Register', registerSchema);