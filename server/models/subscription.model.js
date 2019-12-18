import mongoose from 'mongoose'
Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    //TODO
    signupDate: Date,
    renewalDate: Date,
    smsBalance: Number,
    seriesStart: Number,
    appId: String,
    authId: String,

});

module.exports = mongoose.model('Subscription', subscriptionSchema);