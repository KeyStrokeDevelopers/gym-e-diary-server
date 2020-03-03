const express = require('express')
const { saveClassData, getClassData, updateClassData, deleteClassData } = require('../controllers/class.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getClassData)

router.post('/', checkAuth, saveClassData)

router.put('/', checkAuth, updateClassData)

router.delete('/', checkAuth, deleteClassData)


module.exports = router