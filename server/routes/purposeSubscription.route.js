const express = require('express')
const { savePurposeSubscriptionData, getPurposeSubscriptionData, updatePurposeSubscriptionData, deletePurposeSubscriptionData } = require('../controllers/purposeSubscription.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getPurposeSubscriptionData)

router.post('/', checkAuth, savePurposeSubscriptionData)

router.put('/', checkAuth, updatePurposeSubscriptionData)

router.delete('/', checkAuth, deletePurposeSubscriptionData)


module.exports = router