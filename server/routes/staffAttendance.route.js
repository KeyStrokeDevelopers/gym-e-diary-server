const express = require('express')
const { saveStaffAttendanceData, getStaffAttendanceData, updateStaffAttendanceData, deleteStaffAttendanceData, fetchStaffAttendanceData } = require('../controllers/staffAttendance.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.get('/:staffId', checkAuth, getStaffAttendanceData)

router.post('/getData', checkAuth, getStaffAttendanceData)

router.post('/prfileData', checkAuth, fetchStaffAttendanceData)

router.post('/markAttendance', checkAuth, updateStaffAttendanceData)

router.delete('/', checkAuth, deleteStaffAttendanceData)

router.put('/', checkAuth, updateStaffAttendanceData)



module.exports = router