const express = require('express')
const { getSmsData, saveSmsData, updateSmsData, deleteSmsData, getActiveSmsData } = require('../controllers/sms.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.get('/pack', checkAuth, getSmsData)

router.get('/active', checkAuth, getActiveSmsData)

router.post('/', checkAuth, saveSmsData)

router.put('/:smsId', checkAuth, updateSmsData)

router.delete('/:smsId', checkAuth, deleteSmsData)


module.exports = router