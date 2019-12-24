import express from 'express'
import Access from '../models/access.model';
const router = express.Router()


router.get('/', (req, res) => {
    res.send('access get route')
})

router.post('/', (req, res) => {
    res.send('access post route')
})

router.put('/:accessId', (req, res) => {
    res.send('access put route')
})

router.delete('/:accessId', (req, res) => {
    res.send('access delete route')
})


module.exports = router