import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    startDate: { type: Date, default: new Date().getTime() },
    renewalDate: { type: Date, default: (new Date() + (7 * 86400000)) },
    package: { type: Schema.Types.ObjectId, ref: 'Package', default: '5e02eed398d3744f92668868' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    purchaseDate: { type: Date, default: new Date().getTime() },
    status: { type: Number, default: 1 }

});

export default model('Subscription', subscriptionSchema);
