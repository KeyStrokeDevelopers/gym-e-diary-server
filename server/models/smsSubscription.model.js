const mongoose = require('mongoose')
const moment = require('moment');

const Schema = mongoose.Schema;

const smsSubscriptionSchema = new Schema({
    smsPackage: { type: String, default: 'TRAIL PACKAGE' },
    smsPackPrice: { type: Number, default: 0 },
    smsPackQuantity: { type: Number, default: 10 },
    smsPackPurchaseDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    status: { type: Number, default: 1 }

});

const SmsSubscription = mongoose.model('SmsSubscription', smsSubscriptionSchema);
module.exports = SmsSubscription;
