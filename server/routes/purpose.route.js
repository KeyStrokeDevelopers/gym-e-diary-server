const express = require('express')
const { savePurposeData, getPurposeData, updatePurposeData, deletePurposeData } = require('../controllers/purpose.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getPurposeData);

router.post('/', checkAuth, savePurposeData)

router.delete('/', checkAuth, deletePurposeData)

router.put('/', checkAuth, updatePurposeData)



module.exports = router