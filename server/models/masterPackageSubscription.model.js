const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    packActivation: { type: Date, default: new Date().getTime() },
    renewalDate: { type: Date, default: (new Date().getTime() + (7 * 86400000)) },
    packageName: { type: String, default: 'TRAIL PACKAGE' },
    packPrice: { type: Number, default: 0 },
    packDisc: { type: Number, default: 0 },
    packDuration: { type: Number, default: 7 },
    packDetail: { type: String, default: 'Trail Package' },
    purchaseDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    status: { type: Number, default: 1 }

});

const MasterPackageSubscription = mongoose.model('MasterPackageSubscription', subscriptionSchema);
module.exports = MasterPackageSubscription;
