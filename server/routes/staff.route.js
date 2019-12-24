import express from 'express'
import { checkAuth, userLogin } from '../auth'
const router = express.Router()

router.post("/signIn", userLogin, (req, res) => {
    res.send('ok');

})

router.get('/', checkAuth, (req, res) => {
    res.send({ user: res })
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