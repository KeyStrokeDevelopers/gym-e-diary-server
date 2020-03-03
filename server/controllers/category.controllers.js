const { dataFilter } = require('../constant/fieldFilter')
const { CATEGORY_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveCategoryData = async (req, res) => {
    try {
        const Category = await switchConnection(req.user.newDbName, "Category");
        const categoryData = dataFilter(req.body, CATEGORY_FIELD);
        const isExist = await Category.findOne(({
            $and: [{ categoryType: categoryData.categoryType },
            { category: categoryData.category }, { status: categoryData.status }]
        }));
        if (isExist) {
            throw new Error('Category record is already exist');
        }
        const category = await Category.create(categoryData);
        res.status(200).send(category);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getCategoryData = async (req, res) => {
    try {
        const Category = await switchConnection(req.user.newDbName, "Category");
        const categoryData = await Category.find();
        res.status(200).send(categoryData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updateCategoryData = async (req, res) => {
    try {
        const Category = await switchConnection(req.user.newDbName, "Category");
        const isUpdated = await Category.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedCategoryData = await Category.find();
            res.send(updatedCategoryData);
            return;
        }
        throw new Error('Category data is not updated');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteCategoryData = async (req, res) => {
    try {
        const Category = await switchConnection(req.user.newDbName, "Category");
        const isDelete = await Category.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedCategoryData = await Category.find();
            res.send(updatedCategoryData);
            return;
        }
        throw new Error('Category data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveCategoryData,
    getCategoryData,
    updateCategoryData,
    deleteCategoryData
};