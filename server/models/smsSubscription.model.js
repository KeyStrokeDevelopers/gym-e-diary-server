import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const smsSubscriptionSchema = new Schema({
    smsPackage: { type: Schema.Types.ObjectId, ref: 'smsPackage', default: '5e0208086453cc4859b7dadb' },
    smsPackPrice: { type: Number, default: 0 },
    smsPackPurchaseDate: { type: Date, default: new Date().getTime() },

});

export default model('SmsSubscription', smsSubscriptionSchema);
