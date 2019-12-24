import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    startDate: { type: Date, default: new Date().getTime() },
    renewalDate: { type: Date, default: (new Date() + (7 * 86400000)) },
    package: { type: Schema.Types.ObjectId, ref: 'Package', default: '5e0208086453cc4859b7dada' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    purchaseDate: { type: Date, default: new Date().getTime() }

});

export default model('Subscription', subscriptionSchema);
