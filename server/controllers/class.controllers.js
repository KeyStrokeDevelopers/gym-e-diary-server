const { dataFilter } = require('../constant/fieldFilter')
const { CLASS_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveClassData = async (req, res) => {
    try {
        const ClassInfo = await switchConnection(req.user.newDbName, "ClassInfo");
        const classData = dataFilter(req.body, CLASS_FIELD);

        const isExist = await ClassInfo.findOne({ className: classData.className });
        if (isExist) {
            throw new Error('Class record is already exist');
        }
        const class_data = await ClassInfo.create(classData);
        res.status(200).send(class_data)
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getClassData = async (req, res) => {
    try {
        const ClassInfo = await switchConnection(req.user.newDbName, "ClassInfo");
        const classData = await ClassInfo.find();
        res.status(200).send(classData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const updateClassData = async (req, res) => {
    try {
        const ClassInfo = await switchConnection(req.user.newDbName, "ClassInfo");
        const isUpdated = await ClassInfo.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedClassData = await ClassInfo.find();
            res.send(updatedClassData);
            return;
        }
        throw new Error('Class data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteClassData = async (req, res) => {
    try {
        const ClassInfo = await switchConnection(req.user.newDbName, "ClassInfo");
        const isDelete = await ClassInfo.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedClassData = await ClassInfo.find();
            res.send(updatedClassData);
            return;
        }
        throw new Error('Class data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveClassData,
    getClassData,
    updateClassData,
    deleteClassData
};