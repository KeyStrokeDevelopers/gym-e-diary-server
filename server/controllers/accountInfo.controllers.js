const { fileDataFilter } = require('../constant/fieldFilter')
const { MEDIA_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveAccountInfoData = async (req, res) => {
    try {
        const accountData = fileDataFilter(req.body, MEDIA_FIELD);
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const account_info_data = await AccountInfo.create(accountData);
        res.status(200).send(account_info_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getAccountInfoData = async (req, res) => {
    try {
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const accountData = await AccountInfo.find();
        res.status(200).send(accountData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateAccountInfoData = async (req, res) => {
    try {
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const isUpdated = await AccountInfo.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedAccountInfoData = await AccountInfo.find();
            res.send(updatedAccountInfoData);
            return;
        }
        throw new Error('AccountInfo data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteAccountInfoData = async (req, res) => {
    try {
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const isDelete = await AccountInfo.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedAccountInfoData = await AccountInfo.find();
            res.send(updatedAccountInfoData);
            return;
        }
        throw new Error('AccountInfo data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveAccountInfoData,
    getAccountInfoData,
    updateAccountInfoData,
    deleteAccountInfoData
};