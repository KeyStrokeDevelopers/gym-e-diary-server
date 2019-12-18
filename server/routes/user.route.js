import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.send('User get route')
})

router.post('/', (req, res) => {
    res.send('User post route')
})

router.put('/:userId', (req, res) => {
    res.send('User put route')
})

router.delete('/:userId', (req, res) => {
    res.send('User delete route')
})


module.exports = router