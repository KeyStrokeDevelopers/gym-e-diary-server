const express = require('express')
const path = require('path')
const { checkAuth, userLogin, checkMaster } = require('../auth')
const { getToken, getStaffData, saveStaffData, updateStaffData, deleteStaffData, changePassword, getLogedStaffData } = require('../controllers/staff.controllers')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination: './public/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Math.round(Math.random() * 1000000 + new Date().getTime()) + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.post("/signIn", checkMaster, userLogin, getToken)

router.get('/', checkAuth, getStaffData);

router.get('/initialData', checkAuth, getLogedStaffData);

router.post('/', checkAuth, upload.single('staffImage'), saveStaffData);

router.put('/', checkAuth, upload.single('staffImage'), updateStaffData);

router.put('/:staffId', checkAuth, changePassword)

router.delete('/', checkAuth, deleteStaffData);


module.exports = router