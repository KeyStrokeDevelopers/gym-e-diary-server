const express = require('express')
const path = require('path')
const { getAddMemberData, saveAddMemberData, updateAddMemberData, deleteAddMemberData, getOccupation, updateWishes } = require('../controllers/addMember.controllers')
const { checkAuth } = require('../auth')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: './public/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Math.round(Math.random() * 1000000 + new Date().getTime()) + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

const router = express.Router()

router.get('/', checkAuth, getAddMemberData);

router.get("/occupation", checkAuth, getOccupation);

router.post('/', checkAuth, upload.single('addmImage'), saveAddMemberData)

router.post('/wishes', checkAuth, updateWishes)

router.put('/', checkAuth, updateAddMemberData)

router.delete('/', checkAuth, deleteAddMemberData)


module.exports = router