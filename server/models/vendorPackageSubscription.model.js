const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    packActivation: { type: Date },
    renewalDate: { type: Date },
    packageInfo: { type: Schema.Types.ObjectId, ref: 'VendorPackage', required: true },
    member: { type: Schema.Types.ObjectId, ref: 'AddMember', required: true },
    packPrice: { type: Number, default: 0 },
    packDisc: { type: Number },
    gstPer: { tye: Number },
    purchaseDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    gstValue: { type: Number },
    freeze: { type: Number, default: 0 },
    status: { type: Number, default: 1 }

});

const VendorPackageSubscription = mongoose.model('VendorPackageSubscription', subscriptionSchema);
module.exports = VendorPackageSubscription;
