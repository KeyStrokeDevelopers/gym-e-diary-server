import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.send('category get route')
})

router.post('/', (req, res) => {
    res.send('category post route')
})

router.put('/:categoryId', (req, res) => {
    res.send('category put route')
})

router.delete('/:categoryId', (req, res) => {
    res.send('category delete route')
})


module.exports = router