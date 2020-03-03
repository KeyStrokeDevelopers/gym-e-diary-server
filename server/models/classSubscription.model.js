const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema;

const classSubscriptionSchema = new Schema({
    classActivation: { type: Date },
    renewalDate: { type: Date },
    classInfo: { type: Schema.Types.ObjectId, ref: 'ClassInfo', required: true },
    member: { type: Schema.Types.ObjectId, ref: 'AddMember', required: true },
    classPrice: { type: Number, default: 0 },
    classDisc: { type: Number },
    gstPer: { tye: Number },
    gstValue: { type: Number },
    purchaseDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    freeze: { type: Number, default: 0 },
    status: { type: Number, default: 1 }

});

const ClassSubscription = mongoose.model('ClassSubscription', classSubscriptionSchema);
module.exports = ClassSubscription;