import express from 'express'
import { getAccessData, saveAccessData } from '../controllers/access.controllers'
import { checkAuth } from '../auth'
const router = express.Router()


router.get('/', checkAuth, getAccessData);

router.post('/', checkAuth, saveAccessData);

router.put('/:accessId', (req, res) => {
    res.send('access put route')
})

router.delete('/:accessId', (req, res) => {
    res.send('access delete route')
})


module.exports = router