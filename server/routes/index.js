import express from 'express'
import staff from './staff.route'
import access from './access.route'
import bank from './bank.route'
import gymInfo from './gymInfo.route'
import subscription from './subscription.route'
import packageInfo from './package.route'
import paymentMethod from './paymentMethod.route'
import category from './category.route'
<<<<<<< HEAD
import registration from './registration.route'
=======
import classes from './class.route'
import purpose from './purpose.route'
>>>>>>> 6af9bcb613ec4f32f6adbd8d144bebcca7dbbf67

const router = express.Router()

router.use('/staff', staff)
router.use('/access', access)
router.use('/bank', bank)
router.use('/gymInfo', gymInfo)
router.use('/subscription', subscription)
router.use('/package', packageInfo)
router.use('/paymentMethod', paymentMethod)
router.use('/category', category)
<<<<<<< HEAD
router.use('/registration', registration)
=======
router.use('/class', classes)
router.use('/purpose', purpose)
>>>>>>> 6af9bcb613ec4f32f6adbd8d144bebcca7dbbf67

/**
 * If route is not match
 */
router.use('/*', (req, res) => { res.send('Api route not found') })

module.exports = router
