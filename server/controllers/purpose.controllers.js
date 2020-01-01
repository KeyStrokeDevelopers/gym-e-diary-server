import Purpose from '../models/purpose.model'
import { dataFilter } from '../constant/fieldFilter'
import { BANK_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const savePurposeData = async (req, res) => {
    console.log('req.body ---in save purpose data--', req.body);
    try {
        const purposeData = dataFilter(req.body, BANK_FIELD);
        const savedData = await Purpose.create(purposeData);
        setTimeout(() => {
            res.status(200).send(savedData)
        }, 5000)
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getPurposeData = async (req, res) => {
    console.log('get Purpose data hit ----');
    try {
        const purposeData = await Purpose.find();
        console.log('purpose data in get purpose data -----', purposeData);
        res.status(200).send(purposeData);

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err);
    }
}

export const updatePurposeData = async (req, res) => {
    console.log('req.id in updated purpose data ---', req.body._id)
    try {

        const isUpdated = await Purpose.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPurposeData = await Purpose.find();
            res.send(updatedPurposeData);
            return;
        }
        res.status(400).send({ message: 'Purpose data is not updated' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}

export const deletePurposeData = async (req, res) => {
    try {
        const isDelete = await Purpose.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedPurposeData = await Purpose.find();
            res.send(updatedPurposeData);
            return;
        }
        res.status(400).send({ message: 'Purpose data is not deleted' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}