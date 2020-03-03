const express = require('express')
const { getAccessData, saveAccessData } = require('../controllers/access.controllers')
const { checkAuth } = require('../auth')
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