const express = require('express')
const { savePackageData, getPackageData, updatePackageData, deletePackageData } = require('../controllers/vendorPackage.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getPackageData)

router.post('/', checkAuth, savePackageData)

router.put('/', checkAuth, updatePackageData)

router.delete('/', checkAuth, deletePackageData)


module.exports = router