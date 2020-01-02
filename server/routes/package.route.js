import express from 'express'
import { savePackageData, getPackageData, updatePackageData, deletePackageData } from '../controllers/package.controllers'
import { checkAuth } from '../auth'

const router = express.Router()

router.get('/', checkAuth, getPackageData)

router.post('/', checkAuth, savePackageData)

router.put('/', checkAuth, updatePackageData)

router.delete('/', checkAuth, deletePackageData)


module.exports = router