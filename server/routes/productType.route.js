const express = require('express')
const { saveProductTypeData, getProductTypeData, updateProductTypeData, deleteProductTypeData, activeProductTypeData } = require('../controllers/productType.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getProductTypeData);

router.post('/', checkAuth, saveProductTypeData)

router.delete('/', checkAuth, deleteProductTypeData)

router.get('/active/:productId', checkAuth, activeProductTypeData);

router.put('/', checkAuth, updateProductTypeData)



module.exports = router