const express = require('express')
const { getClassSubscriptionDataByMemberId, saveClassSubscriptionData, deleteClassSubscriptionData, updateClassSubscriptionData } = require('../controllers/classSubscription.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/:memberId', checkAuth, getClassSubscriptionDataByMemberId);

router.post('/', checkAuth, saveClassSubscriptionData)

router.delete('/', checkAuth, deleteClassSubscriptionData)

router.put('/', checkAuth, updateClassSubscriptionData)



module.exports = router