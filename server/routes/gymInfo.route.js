import express from 'express'
import { saveGymInfo } from '../controllers/gymInfo.controllers'
const router = express.Router()


router.get('/', (req, res) => {
    res.send({ 'gym get route': req.body })
})

router.post('/', saveGymInfo);

router.put('/:gymId', (req, res) => {
    res.send('gym put route')
})

router.delete('/:gymId', (req, res) => {
    res.send('gym delete route')
})


module.exports = router