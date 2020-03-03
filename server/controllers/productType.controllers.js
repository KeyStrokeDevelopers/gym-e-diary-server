const { dataFilter } = require('../constant/fieldFilter')
const { PRODUCT_TYPE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveProductTypeData = async (req, res) => {
    console.log('req.body in save product type =----', req.body)
    try {
        const ProductType = await switchConnection(req.user.newDbName, "ProductType");
        const productTypeData = dataFilter(req.body, PRODUCT_TYPE_FIELD);

        console.log('product type data------', productTypeData)

        const isExist = await ProductType.findOne({ productType: productTypeData.productType });
        if (isExist) {
            throw new Error('ProductType record is already exist');
        }
        const savedData = await ProductType.create(productTypeData);
        res.status(200).send(savedData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getProductTypeData = async (req, res) => {
    try {
        const ProductType = await switchConnection(req.user.newDbName, "ProductType");
        const productTypeData = await ProductType.find();
        res.status(200).send(productTypeData);

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
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
        res.status(400).send(err)
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
        res.status(400).send(err)
    }
}

module.exports = {
    saveProductTypeData,
    getProductTypeData,
    updateProductTypeData,
    deleteProductTypeData
};