import ClassInfo from '../models/class.model'
import { dataFilter } from '../constant/fieldFilter'
import { PACKAGE_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const saveClassData = async (req, res) => {
    try {
        const classData = dataFilter(req.body, PACKAGE_FIELD);
        await ClassInfo.create(classData);
        res.status(200).send({ message: 'Class record add successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getClassData = async (req, res) => {
    try {
        const classData = await ClassInfo.find();
        res.status(200).send(classData);
    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err);
    }
}


export const updateClassData = async (req, res) => {
    try {

        const isUpdated = await ClassInfo.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedClassData = await ClassInfo.find();
            res.send(updatedClassData);
            return;
        }
        res.status(400).send({ message: 'Class data is not updated' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}

export const deleteClassData = async (req, res) => {
    try {
        const isDelete = await ClassInfo.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedClassData = await ClassInfo.find();
            res.send(updatedClassData);
            return;
        }
        res.status(400).send({ message: 'Class data is not deleted' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}