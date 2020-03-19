const { dataFilter } = require('../constant/fieldFilter')
const { BRAND_UNIT_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveBrandUnitData = async (req, res) => {
    try {
        const BrandUnit = await switchConnection(req.user.newDbName, "BrandUnit");
        const brandUnitData = dataFilter(req.body, BRAND_UNIT_FIELD);
        const isExist = await BrandUnit.findOne({ $and: [{ entryType: brandUnitData.entryType }, { value: brandUnitData.value }, { status: 1 }] });
        if (isExist) {
            throw new Error('Record is already exist');
        }
        const savedData = await BrandUnit.create(brandUnitData);
        res.status(200).send(savedData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getBrandUnitData = async (req, res) => {
    try {
        const BrandUnit = await switchConnection(req.user.newDbName, "BrandUnit");
        const brandUnitData = await BrandUnit.find();
        res.status(200).send(brandUnitData);

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateBrandUnitData = async (req, res) => {
    try {
        const BrandUnit = await switchConnection(req.user.newDbName, "BrandUnit");
        const isUpdated = await BrandUnit.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedBrandUnitData = await BrandUnit.find();
            res.send(updatedBrandUnitData);
            return;
        }
        throw new Error('BrandUnit data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteBrandUnitData = async (req, res) => {
    try {
        const BrandUnit = await switchConnection(req.user.newDbName, "BrandUnit");
        const isDelete = await BrandUnit.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedBrandUnitData = await BrandUnit.find();
            res.send(updatedBrandUnitData);
            return;
        }
        throw new Error('BrandUnit data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const activeBrandUnitData = async (req, res) => {
    try {
        const BrandUnit = await switchConnection(req.user.newDbName, "BrandUnit");
        const isDelete = await BrandUnit.update({ _id: req.params.brandUnitId }, { $set: { status: 1 } })
        if (isDelete) {
            let updatedBrandUnitData = await BrandUnit.find();
            res.send(updatedBrandUnitData);
            return;
        }
        throw new Error('BrandUnit data is not activated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveBrandUnitData,
    getBrandUnitData,
    updateBrandUnitData,
    deleteBrandUnitData,
    activeBrandUnitData
};