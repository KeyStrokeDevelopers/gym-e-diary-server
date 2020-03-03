const { dataFilter } = require('../constant/fieldFilter')
const { PURPOSE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const savePurposeSubscriptionData = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const purposeSubscriptionData = dataFilter(req.body, PURPOSE_FIELD);
        purposeSubscriptionData.member = req.body.member;
        const purpose_subscription_data = await PurposeSubscription.create(purposeSubscriptionData);
        res.status(200).send(purpose_subscription_data)
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getPurposeSubscriptionData = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const purposeSubscriptionData = await PurposeSubscription.find();
        res.status(200).send(purposeSubscriptionData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const updatePurposeSubscriptionData = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const isUpdated = await PurposeSubscription.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPurposeSubscriptionData = await PurposeSubscription.find();
            res.send(updatedPurposeSubscriptionData);
            return;
        }
        throw new Error('PurposeSubscription data is not updated')

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deletePurposeSubscriptionData = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const isDelete = await PurposeSubscription.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedPurposeSubscriptionData = await PurposeSubscription.find();
            res.send(updatedPurposeSubscriptionData);
            return;
        }
        throw new Error('PurposeSubscription data is not deleted')

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    savePurposeSubscriptionData,
    getPurposeSubscriptionData,
    updatePurposeSubscriptionData,
    deletePurposeSubscriptionData
};