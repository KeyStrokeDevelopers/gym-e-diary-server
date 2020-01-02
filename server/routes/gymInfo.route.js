import express from 'express'
import { saveGymInfo } from '../controllers/gymInfo.controllers'
import { checkAuth } from '../auth'

const router = express.Router()

router.get('/', checkAuth, (req, res) => {
    res.send({ 'gym get route': req.body })
})

router.post('/', checkAuth, saveGymInfo);

router.put('/:gymId', checkAuth, (req, res) => {
    res.send('gym put route')
})

router.delete('/:gymId', checkAuth, (req, res) => {
    res.send('gym delete route')
})


module.exports = router