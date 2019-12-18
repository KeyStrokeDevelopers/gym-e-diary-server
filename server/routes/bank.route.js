import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.send('bank get route')
})

router.post('/', (req, res) => {
    res.send('bank post route')
})

router.put('/:bankId', (req, res) => {
    res.send('bank put route')
})

router.delete('/:bankId', (req, res) => {
    res.send('bank delete route')
})


module.exports = router