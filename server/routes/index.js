import express from 'express'
import user from './user.route'
import access from './access.route'
import bank from './bank.route'
import gymInfo from './gymInfo.route'
import subscription from './subscription.route'
const router = express.Router()

router.use('/user', user)
router.use('/access', access)
router.use('/bank', bank)
router.use('/gymInfo', gymInfo)
router.use('/subscription', subscription)

router.use('/*', (req, res) => { res.send('Api route not found') })

module.exports = router
