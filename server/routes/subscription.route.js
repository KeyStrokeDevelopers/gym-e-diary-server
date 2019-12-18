import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.send('subscription get route')
})

router.post('/', (req, res) => {
    res.send('subscription post route')
})

router.put('/:subscriptionId', (req, res) => {
    res.send('subscription put route')
})

router.delete('/:subscriptionId', (req, res) => {
    res.send('subscription delete route')
})


module.exports = router