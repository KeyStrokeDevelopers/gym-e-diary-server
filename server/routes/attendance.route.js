const express = require('express')
const { saveAttendanceData, getAttendanceData, updateAttendanceData, deleteAttendanceData } = require('../controllers/attendance.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.post('/getAttendance', checkAuth, getAttendanceData);

router.post('/', checkAuth, saveAttendanceData)

router.delete('/', checkAuth, deleteAttendanceData)

router.put('/', checkAuth, updateAttendanceData)



module.exports = router