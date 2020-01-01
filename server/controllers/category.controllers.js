import Category from '../models/categories.model'
import { dataFilter } from '../constant/fieldFilter'
import { CATEGORY_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const saveCategoryData = async (req, res) => {
    try {
        const categoryData = dataFilter(req.body, CATEGORY_FIELD);
        const isExist = await Category.findOne(({$and:[{categoryType: categoryData.categoryType},
             {category: categoryData.category},{status: categoryData.status}]}));
        if (isExist) { 
            res.status(401).send({message: 'Category record is already exist'}) 
            return
        }
        await Category.create(categoryData);
        res.status(200).send({ message: 'Category record add successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getCategoryData = async (req, res) => {
    try {
        const categoryData = await Category.find();
        res.status(200).send(categoryData);
    } catch (err) {
        console.log('error----',err)
        res.status(400).send(err);
    }
}