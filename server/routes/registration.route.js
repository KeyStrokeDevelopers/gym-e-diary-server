import express from 'express'
import { saveRegisterData, getRegisterData} from '../controllers/registration.controllers'
const router = express.Router()


router.get('/', saveRegisterData);

router.post('/', getRegisterData)

router.put('/:registerId', (req, res) => {
    res.send('register put route')
})

router.delete('/:registerId', (req, res) => {
    res.send('register delete route')
})


module.exports = router