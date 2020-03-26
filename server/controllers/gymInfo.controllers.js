const switchConnection = require('../databaseConnection/switchDb');
const { fileDataFilter, GetObjectData } = require('../constant/fieldFilter');
const { GYM_INFO_VIEW_FIELD, GYM_INFO_FIELD } = require('../constant');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const saveGymInfo = async (req, res) => {

    //Todo

    try {
        res.status(200).send({ message: ' Need to be done gym info save controllers' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getGymInfoData = async (req, res) => {
    try {
        const GymInfo = await switchConnection(req.user.newDbName, "GymInfo");
        const Counter = await switchConnection(req.user.newDbName, "Counter");
        const counterData = await Counter.findOne();
        const GymInfoData = await GymInfo.findOne();
        let gym_info_data = GetObjectData(GymInfoData, GYM_INFO_VIEW_FIELD);
        if (counterData) {
            gym_info_data.isCounterOn = counterData.no >= 1 ? true : false;
            gym_info_data.preFix = counterData.preFix;
        }
        res.status(200).send(gym_info_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateGymInfo = async (req, res) => {
    try {
        const GymInfo = await switchConnection(req.user.newDbName, "GymInfo");
        const updateGymInfoData = fileDataFilter(req.body, GYM_INFO_FIELD);
        if (req.file) {
            var index = req.file.filename.indexOf("/");
            if (index < 0) {
                updateGymInfoData.branchLogo = req.file.filename;
            }
        }
        const Counter = await switchConnection(req.user.newDbName, "Counter");
        const counterData = await Counter.findOne();
        if (req.body.preFix && counterData) {
            await Counter.updateOne({ _id: counterData._id }, { $set: { preFix: req.body.preFix } });
        }
        if (!counterData) {
            if (req.body.seriesStartFrom) {
                let counter_data = { _id: 'counterId' };
                counter_data.no = req.body.seriesStartFrom - 1;
                if (req.body.preFix) {
                    counter_data.preFix = req.body.preFix;
                }
                await Counter.create(counter_data);
            }
        }
        const isUpdated = await GymInfo.updateOne({ $set: updateGymInfoData })
        if (isUpdated) {
            let updatedGymInfoData = await GymInfo.findOne();
            res.status(200).send(updatedGymInfoData);
            return;
        }
        throw new Error('GymInfo data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveGymInfo,
    getGymInfoData,
    updateGymInfo
};