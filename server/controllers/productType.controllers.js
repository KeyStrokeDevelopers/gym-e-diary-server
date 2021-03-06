const { dataFilter } = require('../constant/fieldFilter')
const { PRODUCT_TYPE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveProductTypeData = async (req, res) => {
    try {
        const ProductType = await switchConnection(req.user.newDbName, "ProductType");
        const productTypeData = dataFilter(req.body, PRODUCT_TYPE_FIELD);
        const isExist = await ProductType.findOne({ $and: [{ productType: productTypeData.productType }, { status: 1 }] });
        if (isExist) {
            throw new Error('ProductType record is already exist');
        }
        const savedData = await ProductType.create(productTypeData);
        res.status(200).send(savedData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getProductTypeData = async (req, res) => {
    try {
        const ProductType = await switchConnection(req.user.newDbName, "ProductType");
        const productTypeData = await ProductType.find();
        res.status(200).send(productTypeData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateProductTypeData = async (req, res) => {
    try {
        const ProductType = await switchConnection(req.user.newDbName, "ProductType");
        const isUpdated = await ProductType.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedProductTypeData = await ProductType.find();
            res.send(updatedProductTypeData);
            return;
        }
        throw new Error('ProductType data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteProductTypeData = async (req, res) => {
    try {
        const ProductType = await switchConnection(req.user.newDbName, "ProductType");
        const isDelete = await ProductType.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedProductTypeData = await ProductType.find();
            res.send(updatedProductTypeData);
            return;
        }
        throw new Error('ProductType data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const activeProductTypeData = async (req, res) => {
    try {
        const ProductType = await switchConnection(req.user.newDbName, "ProductType");
        const isDelete = await ProductType.update({ _id: req.params.productId }, { $set: { status: 1 } })
        if (isDelete) {
            let updatedProductTypeData = await ProductType.find();
            res.send(updatedProductTypeData);
            return;
        }
        throw new Error('ProductType data is not activated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveProductTypeData,
    getProductTypeData,
    updateProductTypeData,
    deleteProductTypeData,
    activeProductTypeData
};