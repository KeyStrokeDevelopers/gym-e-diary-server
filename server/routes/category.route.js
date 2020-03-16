const express = require('express')
const { saveCategoryData, getCategoryData, updateCategoryData, deleteCategoryData, activeCategoryData } = require('../controllers/category.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getCategoryData)

router.get('/active/:categoryId', checkAuth, activeCategoryData)

router.post('/', checkAuth, saveCategoryData)

router.put('/', checkAuth, updateCategoryData)

router.delete('/', checkAuth, deleteCategoryData)


module.exports = router