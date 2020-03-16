const express = require('express')
const { savePackageData, getPackageData, updatePackageData, deletePackageData, activePackageData } = require('../controllers/vendorPackage.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getPackageData)

router.get('/active/:packId', checkAuth, activePackageData)

router.post('/', checkAuth, savePackageData)

router.put('/', checkAuth, updatePackageData)

router.delete('/', checkAuth, deletePackageData)


module.exports = router