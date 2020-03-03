const { dataFilter } = require('../constant/fieldFilter')
const { CLASS_SUBSCRIPTION_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveClassSubscriptionData = async (req, res) => {
    try {
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const ClassSubscription = await switchConnection(req.user.newDbName, "ClassSubscription");
        const classSubscriptionData = dataFilter(req.body, CLASS_SUBSCRIPTION_FIELD);
        console.log('classSubscriptionData', classSubscriptionData);
        const ClassInfo = await switchConnection(req.user.newDbName, "ClassInfo");
        const classInfoData = await ClassInfo.findOne({ _id: classSubscriptionData.classInfo });
        let classRenewalDate;
        let classActivationDate = classSubscriptionData.classActivation;
        let classDuration = classInfoData.classDuration;
        if (classInfoData.durationIn === 'months') {
            classRenewalDate = new Date(classActivationDate).setMonth(new Date(classActivationDate).getMonth() + classDuration);
        } else {
            classRenewalDate = new Date(classActivationDate).setDate(new Date(classActivationDate).getDate() + classDuration);
        }
        classSubscriptionData.renewalDate = classRenewalDate;
        const savedData = await ClassSubscription.create(classSubscriptionData);

        //Entry in transaction collection
        let transactionData = {};
        transactionData.member = savedData._id;
        transactionData.description = 'New Class Registration';
        transactionData.amount = savedData.classPrice - savedData.classDisc;
        transactionData.transactionStatus = 'Debit';
        transactionData.paymentMode = 'Service';
        transactionData.transactionType = 'Member';
        await Transaction.create(transactionData);

        /**
        * Credit entry in transaction collection
        */
        if (classSubscriptionData.paidAmount > 0) {
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
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getClassSubscriptionDataByMemberId = async (req, res) => {
    try {
        const ClassSubscription = await switchConnection(req.user.newDbName, "ClassSubscription");
        const classSubscriptionData = await ClassSubscription.find({ member: req.params.memberId }).populate('classInfo');
        res.status(200).send(classSubscriptionData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updateClassSubscriptionData = async (req, res) => {
    try {
        const ClassSubscription = await switchConnection(req.user.newDbName, "ClassSubscription");
        const isUpdated = await ClassSubscription.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedClassSubscriptionData = await ClassSubscription.find();
            res.send(updatedClassSubscriptionData);
            return;
        }
        throw new Error('ClassSubscription data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteClassSubscriptionData = async (req, res) => {
    try {
        const ClassSubscription = await switchConnection(req.user.newDbName, "ClassSubscription");
        const isDelete = await ClassSubscription.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedClassSubscriptionData = await ClassSubscription.find();
            res.send(updatedClassSubscriptionData);
            return;
        }
        throw new Error('ClassSubscription data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveClassSubscriptionData,
    getClassSubscriptionDataByMemberId,
    updateClassSubscriptionData,
    deleteClassSubscriptionData
};