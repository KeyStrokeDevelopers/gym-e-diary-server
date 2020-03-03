const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveSubscriptionData = async (req, res) => {
    try {

        const Subscription = await switchConnection(req.user.newDbName, "MasterPackageSubscription");

        let renewaldate = new Date(req.body.activationDate);
        renewaldate.setDate(renewaldate.getDate() + req.body.package.packDuration);

        let subscriptionData = {};
        subscriptionData.packActivation = req.body.activationDate;
        subscriptionData.renewalDate = renewaldate;
        subscriptionData.packageName = req.body.package.packName;
        subscriptionData.packPrice = req.body.package.packPrice;
        subscriptionData.packDisc = 0;
        subscriptionData.packDuration = req.body.package.packDuration;
        subscriptionData.packDetail = req.body.package.packDetails;
        subscriptionData.status = 2;
        await Subscription.create(subscriptionData);
        res.status(200).send({});
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getSubscriptionData = async (req, res) => {
    try {
        const Subscription = await switchConnection('gym-e-master', "masterPackage");
        const subscriptionData = await Subscription.find();
        res.status(200).send(subscriptionData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const getSubscriptionActiveData = async (req, res) => {
    try {
        const Subscription = await switchConnection(req.user.newDbName, "MasterPackageSubscription");
        const subscriptionData = await Subscription.find();
        res.status(200).send(subscriptionData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const updateSubscriptionData = async (req, res) => {
    try {
        const Subscription = await switchConnection('gym-e-master', "masterPackage");
        const isUpdated = await Subscription.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedSubscriptionData = await Subscription.find();
            res.send(updatedSubscriptionData);
            return;
        }
        throw new Error('Subscription data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteSubscriptionData = async (req, res) => {
    try {
        const Subscription = await switchConnection('gym-e-master', "masterPackage");
        const isDelete = await Subscription.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedSubscriptionData = await Subscription.find();
            res.send(updatedSubscriptionData);
            return;
        }
        throw new Error('Subscription data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveSubscriptionData,
    getSubscriptionData,
    getSubscriptionActiveData,
    updateSubscriptionData,
    deleteSubscriptionData
};