import express from 'express'
import { saveCategoryData, getCategoryData, updateCategoryData, deleteCategoryData } from '../controllers/category.controllers'
import { checkAuth } from '../auth'
const router = express.Router()


router.get('/', checkAuth, getCategoryData)

router.post('/', checkAuth, saveCategoryData)

router.put('/', checkAuth, updateCategoryData)

router.delete('/', checkAuth, deleteCategoryData)


module.exports = router