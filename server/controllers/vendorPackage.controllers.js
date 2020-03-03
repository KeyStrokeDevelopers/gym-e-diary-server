const { dataFilter } = require('../constant/fieldFilter')
const { VENDOR_PACKAGE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const savePackageData = async (req, res) => {
    try {
        const VendorPackage = await switchConnection(req.user.newDbName, "VendorPackage");
        const packageData = dataFilter(req.body, VENDOR_PACKAGE_FIELD);
        const isExist = await VendorPackage.findOne({ packName: packageData.packName });
        if (isExist) {
            throw new Error('Package record is already exist');
        }
        const package_data = await VendorPackage.create(packageData);
        res.status(200).send(package_data)
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getPackageData = async (req, res) => {
    try {
        const VendorPackage = await switchConnection(req.user.newDbName, "VendorPackage");
        const packageData = await VendorPackage.find();
        res.status(200).send(packageData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const updatePackageData = async (req, res) => {
    try {
        const VendorPackage = await switchConnection(req.user.newDbName, "VendorPackage");
        const isUpdated = await VendorPackage.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPackageData = await VendorPackage.find();
            res.send(updatedPackageData);
            return;
        }
        throw new Error('Package data is not updated');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deletePackageData = async (req, res) => {
    try {
        const VendorPackage = await switchConnection(req.user.newDbName, "VendorPackage");
        const isDelete = await VendorPackage.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedPackageData = await VendorPackage.find();
            res.send(updatedPackageData);
            return;
        }
        throw new Error('Package data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    savePackageData,
    getPackageData,
    updatePackageData,
    deletePackageData
};