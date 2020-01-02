import express from 'express'
import { getAddMemberData, saveAddMemberData} from '../controllers/addMember.controllers'
import { checkAuth } from '../auth'
const router = express.Router()


router.get('/', checkAuth, getAddMemberData);

router.post('/', checkAuth, saveAddMemberData)

router.put('/:registerId', (req, res) => {
    res.send('register put route')
})

router.delete('/:registerId', (req, res) => {
    res.send('register delete route')
})


module.exports = router