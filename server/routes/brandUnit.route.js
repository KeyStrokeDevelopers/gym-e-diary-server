const express = require('express')
const { saveBrandUnitData, getBrandUnitData, updateBrandUnitData, deleteBrandUnitData } = require('../controllers/brandUnit.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getBrandUnitData);

router.post('/', checkAuth, saveBrandUnitData)

router.delete('/', checkAuth, deleteBrandUnitData)

router.put('/', checkAuth, updateBrandUnitData)



module.exports = router