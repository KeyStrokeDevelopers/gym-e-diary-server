const express = require('express')
const { saveEnquiryData, getEnquiryData, updateEnquiryData, deleteEnquiryData } = require('../controllers/enquiry.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getEnquiryData)

router.post('/', checkAuth, saveEnquiryData)

router.put('/', checkAuth, updateEnquiryData)

router.delete('/', checkAuth, deleteEnquiryData)


module.exports = router