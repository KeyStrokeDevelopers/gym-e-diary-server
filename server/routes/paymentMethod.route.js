import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.send('paymentMethod get route')
})

router.post('/', (req, res) => {
    res.send('paymentMethod post route')
})

router.put('/:paymentMethodId', (req, res) => {
    res.send('paymentMethod put route')
})

router.delete('/:paymentMethodId', (req, res) => {
    res.send('paymentMethod delete route')
})


module.exports = router