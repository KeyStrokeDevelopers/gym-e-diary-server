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
        const packageData = await Package.find();
        res.status(200).send(packageData);
    } catch (err) {
        console.log('error----',err)
        res.status(400).send(err);
    }
}