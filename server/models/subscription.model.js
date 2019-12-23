import mongoose from 'mongoose'
Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    signupDate: {type: Date, default: Date.now},
    renewalDate: {type: Date, default: Date.now + (7 * 86400000)},
    smsBalance: {type: Number, default: 0},
    appId: {type: String, default: null},
    authId: {type:String, default: null},
    smsApi: {type: String, default: null},
    smsLimit: {type: Number, default: null},
    firmName: {type: String, default: null},
    package: {type: String, default: '2'},
});

module.exports = mongoose.model('Subscription', subscriptionSchema);