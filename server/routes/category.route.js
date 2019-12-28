import express from 'express'
import { saveCategoryData, getCategoryData } from '../controllers/category.controllers'
const router = express.Router()


router.get('/', getCategoryData)

router.post('/', saveCategoryData)

router.put('/:categoryId', (req, res) => {
    res.send('category put route')
})

router.delete('/:categoryId', (req, res) => {
    res.send('category delete route')
})


module.exports = router