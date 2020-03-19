const express = require('express')
const { saveProductData, getProductData, updateProductData, deleteProductData, getProductQuantity, activeProductData } = require('../controllers/product.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getProductData);

router.get('/:productId', checkAuth, getProductQuantity)

router.get('/active/:productId', checkAuth, activeProductData)

router.post('/', checkAuth, saveProductData)

router.delete('/', checkAuth, deleteProductData)

router.put('/', checkAuth, updateProductData)



module.exports = router