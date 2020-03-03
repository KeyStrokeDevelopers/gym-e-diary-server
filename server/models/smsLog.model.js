const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const smsLogSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, ref: 'AccountInfo' },
    memberId: { type: Schema.Types.ObjectId, ref: 'AddMember' },
    smsBody: String,
    smsDate: { type: Date, default: new Date() },
    smsType: { type: String, required: true }
})

module.exports = mongoose.model('SmsLog', smsLogSchema);