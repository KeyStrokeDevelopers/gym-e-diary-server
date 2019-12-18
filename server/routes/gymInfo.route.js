import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.send('gym get route')
})

router.post('/', (req, res) => {
    res.send('gym post route')
})

router.put('/:gymId', (req, res) => {
    res.send('gym put route')
})

router.delete('/:gymId', (req, res) => {
    res.send('gym delete route')
})


module.exports = router