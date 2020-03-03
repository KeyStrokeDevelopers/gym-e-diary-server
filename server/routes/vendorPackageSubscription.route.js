const express = require('express')
const { getVendorPackageSubscriptionData, getVendorPackageSubscriptionDataByMemberId, saveVendorPackageSubscriptionData, deleteVendorPackageSubscriptionData, updateVendorPackageSubscriptionData } = require('../controllers/vendorPackageSubscription.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/:memberId', checkAuth, getVendorPackageSubscriptionDataByMemberId);

router.get('/', checkAuth, getVendorPackageSubscriptionData)

router.post('/', checkAuth, saveVendorPackageSubscriptionData)

router.delete('/', checkAuth, deleteVendorPackageSubscriptionData)

router.put('/', checkAuth, updateVendorPackageSubscriptionData)



module.exports = router