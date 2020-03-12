const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema;

const smsLogSchema = new Schema({
    smsCount: Number,
    msgId: String,
    sendTo: Array,
    smsBody: String,
    smsDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    smsType: { type: String, required: true }
})

module.exports = mongoose.model('SmsLog', smsLogSchema);