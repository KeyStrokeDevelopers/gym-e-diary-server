const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema;

const smsLogSchema = new Schema({
    smsCount: { type: Number, default: 1 },
    msgId: String,
    sendTo: String,
    smsBody: String,
    smsDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    smsType: { type: String, required: true }
})

module.exports = mongoose.model('SmsLog', smsLogSchema);