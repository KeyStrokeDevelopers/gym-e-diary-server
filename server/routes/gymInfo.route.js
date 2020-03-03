const express = require('express')
const path = require('path')
const { saveGymInfo, getGymInfoData, updateGymInfo } = require('../controllers/gymInfo.controllers')
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

router.get('/', checkAuth, getGymInfoData);

router.post('/', checkAuth, saveGymInfo);

router.put('/', checkAuth, upload.single('branchLogo'), updateGymInfo)

router.delete('/:gymId', checkAuth, (req, res) => {
    res.send('gym delete route')
})


module.exports = router