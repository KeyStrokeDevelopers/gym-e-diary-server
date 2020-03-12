const { dataFilter } = require('../constant/fieldFilter')
const { VENDOR_PACKAGE_SUBSCRIPTION_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveVendorPackageSubscriptionData = async (req, res) => {
    try {
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const vendorPackageData = dataFilter(req.body, VENDOR_PACKAGE_SUBSCRIPTION_FIELD);
        const VendorPackageInfo = await switchConnection(req.user.newDbName, "VendorPackage");
        const vendorPackageInfoData = await VendorPackageInfo.findOne({ _id: vendorPackageData.packageInfo });
        let packRenewalDate;
        let packActivationDate = vendorPackageData.packActivation;
        let packDuration = vendorPackageInfoData.packDuration;
        if (vendorPackageInfoData.durationIn === 'months') {
            packRenewalDate = new Date(packActivationDate).setMonth(new Date(packActivationDate).getMonth() + packDuration);
        } else {
            packRenewalDate = new Date(packActivationDate).setDate(new Date(packActivationDate).getDate() + packDuration);
        }
        vendorPackageData.renewalDate = packRenewalDate;
        const savedData = await VendorPackageSubscription.create(vendorPackageData);

        //Entry in transaction collection
        let transactionData = {};
        transactionData.member = savedData._id;
        transactionData.description = 'New Package Registration';
        transactionData.amount = savedData.packPrice - savedData.packDisc;
        transactionData.transactionStatus = 'Debit';
        transactionData.paymentMode = 'Service';
        transactionData.transactionType = 'Member';
        await Transaction.create(transactionData);

        /**
        * Credit entry in transaction collection
        */
        if (vendorPackageData.paidAmount > 0) {
            let transactionData = {};
            transactionData.member = savedData._id;
            transactionData.description = 'Registration Payment';
            transactionData.amount = req.body.paidAmount;
            transactionData.transactionStatus = 'Credit';
            transactionData.paymentMode = 'Method';
            transactionData.transactionType = 'Member';
            transactionData.paymentModeDescription = req.body.paymentMode;
            await Transaction.create(transactionData);
        }
        res.status(200).send(savedData);
    } catch (err) {
        console.log('error--', err.message)
        res.status(400).json({ message: err.message })
    }
}

const getVendorPackageSubscriptionData = async (req, res) => {
    try {
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const vendorPackageData = await VendorPackageSubscription.find();
        res.status(200).send(vendorPackageData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getVendorPackageSubscriptionDataByMemberId = async (req, res) => {
    try {
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const vendorPackageData = await VendorPackageSubscription.find({ member: req.params.memberId }).populate('packageInfo');
        res.status(200).send(vendorPackageData);

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateVendorPackageSubscriptionData = async (req, res) => {
    try {
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const isUpdated = await VendorPackageSubscription.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedVendorPackageSubscriptionData = await VendorPackageSubscription.find();
            res.send(updatedVendorPackageSubscriptionData);
            return;
        }
        throw new Error('VendorPackageSubscription data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteVendorPackageSubscriptionData = async (req, res) => {
    try {
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const isDelete = await VendorPackageSubscription.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedVendorPackageSubscriptionData = await VendorPackageSubscription.find();
            res.send(updatedVendorPackageSubscriptionData);
            return;
        }
        throw new Error('VendorPackageSubscription data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveVendorPackageSubscriptionData,
    getVendorPackageSubscriptionData,
    getVendorPackageSubscriptionDataByMemberId,
    updateVendorPackageSubscriptionData,
    deleteVendorPackageSubscriptionData
};