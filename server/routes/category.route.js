import express from 'express'
import { saveCategoryData, getCategoryData, updateCategoryData, deleteCategoryData } from '../controllers/category.controllers'
const router = express.Router()


router.get('/', getCategoryData)

router.post('/', saveCategoryData)

router.put('/', updateCategoryData)

router.delete('/', deleteCategoryData)


module.exports = router