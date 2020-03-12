const { dataFilter } = require('../constant/fieldFilter')
const { PRODUCT_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveProductData = async (req, res) => {
    try {
        const Product = await switchConnection(req.user.newDbName, "Product");
        const productData = dataFilter(req.body, PRODUCT_FIELD);
        const savedData = await Product.create(productData);
        const product_data = await Product.find({ status: 1 }).populate('brand').populate('product').populate('measuringUnit');
        res.status(200).send(product_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getProductData = async (req, res) => {
    try {
        const Product = await switchConnection(req.user.newDbName, "Product");
        const productData = await Product.find({ status: 1 }).populate('brand').populate('product').populate('measuringUnit');
        res.status(200).send(productData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateProductData = async (req, res) => {
    try {
        const Product = await switchConnection(req.user.newDbName, "Product");
        const isUpdated = await Product.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedProductData = await Product.find({ status: 1 }).populate('brand').populate('product').populate('measuringUnit');
            res.send(updatedProductData);
            return;
        }
        throw new Error('Product data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteProductData = async (req, res) => {
    try {
        const Product = await switchConnection(req.user.newDbName, "Product");
        const isDelete = await Product.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedProductData = await Product.find({ status: 1 }).populate('brand').populate('product').populate('measuringUnit');
            res.send(updatedProductData);
            return;
        }
        throw new Error('Product data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getProductQuantity = async (req, res) => {
    try {
        const Product = await switchConnection(req.user.newDbName, "Product");
        const productQuantity = await Product.findOne({ _id: req.params.productId }, { quantity: 1, _id: 0 });
        res.status(200).send(productQuantity)
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveProductData,
    getProductData,
    updateProductData,
    deleteProductData,
    getProductQuantity
};