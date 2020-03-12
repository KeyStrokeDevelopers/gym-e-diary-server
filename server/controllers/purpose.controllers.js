const { dataFilter } = require('../constant/fieldFilter')
const { PURPOSE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const savePurposeData = async (req, res) => {
    try {
        const Purpose = await switchConnection(req.user.newDbName, "Purpose");
        const purposeData = dataFilter(req.body, PURPOSE_FIELD);

        const isExist = await Purpose.findOne({ purposeName: purposeData.purposeName });
        if (isExist) {
            throw new Error('Purpose record is already exist');
        }
        const savedData = await Purpose.create(purposeData);
        res.status(200).send(savedData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getPurposeData = async (req, res) => {
    try {
        const Purpose = await switchConnection(req.user.newDbName, "Purpose");
        const purposeData = await Purpose.find();
        res.status(200).send(purposeData);

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updatePurposeData = async (req, res) => {
    try {
        const Purpose = await switchConnection(req.user.newDbName, "Purpose");
        const isUpdated = await Purpose.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPurposeData = await Purpose.find();
            res.send(updatedPurposeData);
            return;
        }
        throw new Error('Purpose data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deletePurposeData = async (req, res) => {
    try {
        const Purpose = await switchConnection(req.user.newDbName, "Purpose");
        const isDelete = await Purpose.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedPurposeData = await Purpose.find();
            res.send(updatedPurposeData);
            return;
        }
        throw new Error('Purpose data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    savePurposeData,
    getPurposeData,
    updatePurposeData,
    deletePurposeData
};