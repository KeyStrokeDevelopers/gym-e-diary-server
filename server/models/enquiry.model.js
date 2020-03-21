const mongoose = require('mongoose')
const moment = require('moment');

const Schema = mongoose.Schema;

const enquirySchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    fTitle: String,
    favourOf: String,
    alternativeContact: String,
    email: String,
    dob: { type: Date },
    enqDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    address: { type: String, required: true },
    query: String,
    response: { type: String, required: true },
    followUp: Boolean,
    followUpDate: Date,
    referredBy: String,
    packageInfo: { type: Schema.Types.ObjectId, ref: 'VendorPackage' },
    classInfo: { type: Schema.Types.ObjectId, ref: 'ClassInfo' },
    purpose: { type: Schema.Types.ObjectId, ref: 'Purpose', required: true },
    enqStatus: { type: String, default: 'new' }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;