import express from 'express'
import { saveClassData, getClassData, updateClassData, deleteClassData } from '../controllers/class.controllers'
const router = express.Router()


router.get('/', getClassData)

router.post('/', saveClassData)

router.put('/', updateClassData)

router.delete('/', deleteClassData)


module.exports = router