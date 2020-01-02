import express from 'express'
import { checkAuth, userLogin, checkMaster } from '../auth'
import { getToken, getStaffData, saveStaffData } from '../controllers/staff.controllers'
const router = express.Router()

router.post("/signIn", checkMaster, userLogin, getToken)

router.get('/', checkAuth, getStaffData);

router.post('/', checkAuth, saveStaffData)

router.put('/:userId', (req, res) => {
    res.send('User put route')
})

router.delete('/:userId', (req, res) => {
    res.send('User delete route')
})


module.exports = router