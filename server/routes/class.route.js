import express from 'express'
import { saveClassData, getClassData, updateClassData, deleteClassData } from '../controllers/class.controllers'
import { checkAuth } from '../auth'

const router = express.Router()

router.get('/', checkAuth, getClassData)

router.post('/', checkAuth, saveClassData)

router.put('/', checkAuth, updateClassData)

router.delete('/', checkAuth, deleteClassData)


module.exports = router