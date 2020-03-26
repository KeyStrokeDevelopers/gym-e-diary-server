const { setDbName } = require('../models/addMember.model')
const { fileDataFilter } = require('../constant/fieldFilter')
const { ADD_MEMBER_FIELD, VENDOR_PACKAGE_SUBSCRIPTION_FIELD, CLASS_SUBSCRIPTION_FIELD, PURPOSE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveAddMemberData = async (req, res) => {
    try {
        if (req.body._id) {
            const Enquiry = await switchConnection(req.user.newDbName, "Enquiry");
            await Enquiry.deleteOne({ _id: req.body._id })
        }
        setDbName(req.user.newDbName);
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const addMemberData = fileDataFilter(req.body, ADD_MEMBER_FIELD);
        addMemberData.profileImage = req.file && req.file.filename;
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        let isInserted;
        if (addMemberData.memberEmail) {
            isInserted = await AddMember.findOne({ $or: [{ memberEmail: addMemberData.memberEmail }, { contact: addMemberData.contact }] });
        } else {
            isInserted = await AddMember.findOne({ contact: addMemberData.contact });
        }
        if (isInserted) {
            throw new Error('Record already inserted');
        }

        const add_member = await AddMember.create(addMemberData);

        /**
        * Debit entry in transaction collection for registration fees
        */
        if (req.body.regFee > 0) {
            let transactionData = {};
            transactionData.member = add_member._id;
            transactionData.description = 'Registration Fees';
            transactionData.amount = req.body.regFee;
            transactionData.transactionStatus = 'Debit';
            transactionData.paymentMode = 'Service';
            transactionData.transactionType = 'Member';
            await Transaction.create(transactionData);
        }

        /**
         * Add record in vendor package subscription
         */
        const vendorPackageSubscriptionData = fileDataFilter(req.body, VENDOR_PACKAGE_SUBSCRIPTION_FIELD);
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const VendorPackageInfo = await switchConnection(req.user.newDbName, "VendorPackage");
        const vendorPackageInfoData = await VendorPackageInfo.findOne({ _id: vendorPackageSubscriptionData.packageInfo });
        let packRenewalDate;
        let packActivationDate = vendorPackageSubscriptionData.packActivation;
        let packDuration = vendorPackageInfoData.packDuration;
        if (vendorPackageInfoData.durationIn === 'months') {
            packRenewalDate = new Date(packActivationDate).setMonth(new Date(packActivationDate).getMonth() + packDuration);
        } else {
            packRenewalDate = new Date(packActivationDate).setDate(new Date(packActivationDate).getDate() + packDuration);
        }
        vendorPackageSubscriptionData.member = add_member._id;
        vendorPackageSubscriptionData.renewalDate = packRenewalDate;
        vendorPackageSubscriptionData.gstValue = req.body.gstValue;
        vendorPackageSubscriptionData.getPer = req.body.gstPer;
        const vendor_package_subscription_data = await VendorPackageSubscription.create(vendorPackageSubscriptionData);

        //Entry in transaction collection
        let transactionData = {};
        transactionData.member = add_member._id;
        transactionData.description = 'New Package Registration';
        transactionData.amount = vendor_package_subscription_data.packPrice - vendor_package_subscription_data.packDisc;
        transactionData.transactionStatus = 'Debit';
        transactionData.paymentMode = 'Service';
        transactionData.transactionType = 'Member';
        await Transaction.create(transactionData);

        /**
        * Credit entry in transaction collection
        */
        if (req.body.paidAmount > 0) {
            let transactionData = {};
            transactionData.member = add_member._id;
            transactionData.description = 'Registration Payment';
            transactionData.amount = req.body.paidAmount;
            transactionData.transactionStatus = 'Credit';
            transactionData.paymentMode = 'Method';
            transactionData.transactionType = 'Member';
            transactionData.paymentModeDescription = req.body.paymentMode;
            await Transaction.create(transactionData);
        }

        /**
         * Fetch Purpose record by using purpose id
         */
        const Purpose = await switchConnection(req.user.newDbName, "Purpose");
        const purposeSubscriptionData = await Purpose.findOne({ _id: req.body.purpose });

        /**
         * Copy Purpose record in purpose subscription collections
         */
        const purpose_subscription_data = await fileDataFilter(purposeSubscriptionData, PURPOSE_FIELD);
        purpose_subscription_data.member = add_member._id;
        const PurposeSubscription = await switchConnection(req.user.newDbName, 'PurposeSubscription');
        await PurposeSubscription.create(purpose_subscription_data);

        const member_data = await AddMember.findOne({ _id: add_member._id });
        res.status(200).send(member_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getAddMemberData = async (req, res) => {
    try {
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const addMemberData = await AddMember.find();
        res.status(200).send(addMemberData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateAddMemberData = async (req, res) => {
    try {
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const updateAddMemberData = fileDataFilter(req.body, ADD_MEMBER_FIELD);
        if (req.file) {
            updateAddMemberData.profileImage = req.file && req.file.filename;
        }
        const isUpdated = await AddMember.update({ _id: req.body._id }, { $set: updateAddMemberData })
        if (isUpdated) {
            let updatedAddMemberData = await AddMember.find();
            res.send(updatedAddMemberData);
            return;
        }
        throw new Error('AddMember data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteAddMemberData = async (req, res) => {
    try {
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const isDelete = await AddMember.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedAddMemberData = await AddMember.find();
            res.send(updatedAddMemberData);
            return;
        }
        throw new Error('AddMember data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getOccupation = async (req, res) => {
    try {
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const occupation = await AddMember.find({}, { occupation: 1, _id: 0 }).distinct('occupation');
        res.send(occupation);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateWishes = async (req, res) => {
    try {
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        let isUpdated;
        if (req.body.wishType === 'Birthday') {
            isUpdated = await AddMember.update({ _id: req.body.memberId }, { $set: { birthWish: new Date().getFullYear() } })
        } else {
            isUpdated = await AddMember.update({ _id: req.body.memberId }, { $set: { anniversaryWish: new Date().getFullYear() } })
        }
        if (isUpdated) {
            let updatedAddMemberData = await AddMember.find();
            res.send(updatedAddMemberData);
            return;
        }
        throw new Error('AddMember data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveAddMemberData,
    getAddMemberData,
    updateAddMemberData,
    deleteAddMemberData,
    getOccupation,
    updateWishes
};