import express from 'express'
import { getAccessData, saveAccessData } from '../controllers/access.controllers'
const router = express.Router()


router.get('/', getAccessData);

router.post('/', saveAccessData);

router.put('/:accessId', (req, res) => {
    res.send('access put route')
})

router.delete('/:accessId', (req, res) => {
    res.send('access delete route')
})


module.exports = router