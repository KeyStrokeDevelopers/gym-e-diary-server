import express from 'express'
import { checkAuth, userLogin, checkMaster } from '../auth'
import { getToken } from '../controllers/staff.controllers'
const router = express.Router()

router.post("/signIn", checkMaster, userLogin, getToken)

router.get('/', checkAuth, (req, res) => {
    res.send({ message: 'check auth success' })
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