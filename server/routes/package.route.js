import express from 'express'
import { savePackageData, getPackageData } from '../controllers/package.controllers'
const router = express.Router()


router.get('/', getPackageData)

router.post('/', savePackageData)

router.put('/:packageId', (req, res) => {
    res.send('package put route')
})

router.delete('/:packageId', (req, res) => {
    res.send('package delete route')
})


module.exports = router