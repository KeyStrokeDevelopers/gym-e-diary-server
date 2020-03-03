const express = require('express')
const path = require('path')
const { getMediaData, saveMediaData, updateMediaData, deleteMediaData } = require('../controllers/media.controllers')
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

router.get('/', checkAuth, getMediaData);

router.post('/', checkAuth, upload.single('image'), saveMediaData)

router.put('/', checkAuth, updateMediaData)

router.delete('/', checkAuth, deleteMediaData)


module.exports = router