import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.send('package get route')
})

router.post('/', (req, res) => {
    res.send('package post route')
})

router.put('/:packageId', (req, res) => {
    res.send('package put route')
})

router.delete('/:packageId', (req, res) => {
    res.send('package delete route')
})


module.exports = router