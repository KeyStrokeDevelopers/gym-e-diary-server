const express = require('express')
const { getSubscriptionData, saveSubscriptionData, updateSubscriptionData, deleteSubscriptionData, getSubscriptionActiveData } = require('../controllers/subscription.controllers');
const { checkAuth } = require('../auth');
const router = express.Router()


router.get('/masterPack', checkAuth, getSubscriptionData)

router.get('/active', checkAuth, getSubscriptionActiveData)

router.post('/', checkAuth, saveSubscriptionData)

router.put('/:subscriptionId', checkAuth, updateSubscriptionData)

router.delete('/:subscriptionId', checkAuth, deleteSubscriptionData)


module.exports = router