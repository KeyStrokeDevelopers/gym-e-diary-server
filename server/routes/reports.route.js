const express = require('express')
const { getPendingPaymentsData, getReports, getExpiringMemberships, getExpiredMembers, getNonActiveMembers, getClasses, getRegistration, getRenewal, handleDnd, handleCall, getCurrentStock } = require('../controllers/reports.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/pendingPayments', checkAuth, getPendingPaymentsData);

router.post('/', checkAuth, getReports);

router.get('/expiringMemberships', checkAuth, getExpiringMemberships);

router.get('/expiredMembers', checkAuth, getExpiredMembers);

router.get('/nonActiveMembers', checkAuth, getNonActiveMembers);

router.get('/classes', checkAuth, getClasses);

router.post('/registration', checkAuth, getRegistration);

router.post('/currentStock', checkAuth, getCurrentStock);

router.post('/renewal', checkAuth, getRenewal);

router.get('/dnd/:memberId', checkAuth, handleDnd)

router.get('/call/:memberId', checkAuth, handleCall)


module.exports = router