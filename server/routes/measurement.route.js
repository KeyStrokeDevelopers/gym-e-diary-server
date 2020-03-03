const express = require('express')
const { saveMeasurementData, getMeasurementData, updateMeasurementData, deleteMeasurementData } = require('../controllers/measurement.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getMeasurementData)

router.post('/', checkAuth, saveMeasurementData)

router.put('/', checkAuth, updateMeasurementData)

router.delete('/', checkAuth, deleteMeasurementData)


module.exports = router