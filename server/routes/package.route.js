import express from 'express'
import { savePackageData, getPackageData, updatePackageData, deletePackageData } from '../controllers/package.controllers'
const router = express.Router()


router.get('/', getPackageData)

router.post('/', savePackageData)

router.put('/', updatePackageData)

router.delete('/', deletePackageData)


module.exports = router