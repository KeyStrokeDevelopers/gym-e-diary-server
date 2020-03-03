const express = require('express')
const { saveWorkoutNutritionData, getWorkoutNutritionData, updateWorkoutNutritionData, deleteWorkoutNutritionData } = require('../controllers/workoutNutrition.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getWorkoutNutritionData);

router.post('/', checkAuth, saveWorkoutNutritionData)

router.delete('/', checkAuth, deleteWorkoutNutritionData)

router.put('/', checkAuth, updateWorkoutNutritionData)



module.exports = router