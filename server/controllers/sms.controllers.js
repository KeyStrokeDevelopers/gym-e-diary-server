const switchConnection = require('../databaseConnection/switchDb')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveSmsData = async (req, res) => {
    try {
        const Sms = await switchConnection(req.user.newDbName, "SmsSubscription");
        let smsSubData = {};
        smsSubData.smsPackage = req.body.smsPack.smsPackName;
        smsSubData.smsPackPrice = req.body.smsPack.smsPackPrice;
        smsSubData.smsPackQuantity = req.body.smsPack.smsPackQuantity;
        smsSubData.status = 2;
        await Sms.create(smsSubData);
        const Sms_info_data = await Sms.find();
        res.status(200).send(Sms_info_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getActiveSmsData = async (req, res) => {
    try {
        const Sms = await switchConnection(req.user.newDbName, "SmsSubscription");
        const Sms_info_data = await Sms.find();
        res.status(200).send(Sms_info_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getSmsData = async (req, res) => {
    try {
        const Sms = await switchConnection('gym-e-master', "masterSmsPackage");
        const SmsData = await Sms.find();
        res.status(200).send(SmsData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updateSmsData = async (req, res) => {
    try {
        const Sms = await switchConnection('gym-e-master', "masterSmsPackage");
        const isUpdated = await Sms.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedSmsData = await Sms.find();
            res.send(updatedSmsData);
            return;
        }
        throw new Error('Sms data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteSmsData = async (req, res) => {
    try {
        const Sms = await switchConnection('gym-e-master', "masterSmsPackage");
        const isDelete = await Sms.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedSmsData = await Sms.find();
            res.send(updatedSmsData);
            return;
        }
        throw new Error('Sms data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveSmsData,
    getSmsData,
    updateSmsData,
    getActiveSmsData,
    deleteSmsData
};