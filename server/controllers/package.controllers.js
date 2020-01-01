import PackageInfo from '../models/package.model'
import { dataFilter } from '../constant/fieldFilter'
import { PACKAGE_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const savePackageData = async (req, res) => {
    try {
        const packageData = dataFilter(req.body, PACKAGE_FIELD);
        await PackageInfo.create(packageData);
        res.status(200).send({ message: 'Package record add successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getPackageData = async (req, res) => {
    try {
        const packageData = await PackageInfo.find();
        res.status(200).send(packageData);
    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err);
    }
}


export const updatePackageData = async (req, res) => {
    try {

        const isUpdated = await PackageInfo.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPackageData = await PackageInfo.find();
            res.send(updatedPackageData);
            return;
        }
        res.status(400).send({ message: 'Package data is not updated' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}

export const deletePackageData = async (req, res) => {
    try {
        const isDelete = await PackageInfo.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedPackageData = await PackageInfo.find();
            res.send(updatedPackageData);
            return;
        }
        res.status(400).send({ message: 'Package data is not deleted' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}