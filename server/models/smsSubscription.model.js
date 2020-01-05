import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const smsSubscriptionSchema = new Schema({
    smsPackage: { type: Schema.Types.ObjectId, ref: 'smsPackage' },
    smsPackPrice: { type: Number, default: 0 },
    smsPackPurchaseDate: { type: Date, default: new Date().getTime() },
    status: { type: Number, default: 1 }

});

export default model('SmsSubscription', smsSubscriptionSchema);
