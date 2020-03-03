const { dataFilter } = require('../constant/fieldFilter')
const { MEASUREMENT_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveMeasurementData = async (req, res) => {
    try {
        const Measurement = await switchConnection(req.user.newDbName, "Measurement");
        const measurementData = dataFilter(req.body, MEASUREMENT_FIELD);
        const measurement_data = await Measurement.create(measurementData);
        res.status(200).send(measurement_data)
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getMeasurementData = async (req, res) => {
    try {
        const Measurement = await switchConnection(req.user.newDbName, "Measurement");
        const measurementData = await Measurement.find();
        res.status(200).send(measurementData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const updateMeasurementData = async (req, res) => {
    try {
        const Measurement = await switchConnection(req.user.newDbName, "Measurement");
        const isUpdated = await Measurement.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedMeasurementData = await Measurement.find();
            res.send(updatedMeasurementData);
            return;
        }
        throw new Error('Measurement data is not updated')

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteMeasurementData = async (req, res) => {
    try {
        const Measurement = await switchConnection(req.user.newDbName, "Measurement");
        const isDelete = await Measurement.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedMeasurementData = await Measurement.find();
            res.send(updatedMeasurementData);
            return;
        }
        throw new Error('Measurement data is not deleted')

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveMeasurementData,
    getMeasurementData,
    updateMeasurementData,
    deleteMeasurementData
};