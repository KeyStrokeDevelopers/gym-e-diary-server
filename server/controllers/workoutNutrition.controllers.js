const { dataFilter } = require('../constant/fieldFilter')
const { PURPOSE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveWorkoutNutritionData = async (req, res) => {
    try {
        const WorkoutNutrition = await switchConnection(req.user.newDbName, "WorkoutNutrition");
        const workoutNutritionData = dataFilter(req.body, PURPOSE_FIELD);

        const isExist = await WorkoutNutrition.findOne({ purposeName: workoutNutritionData.purposeName });
        if (isExist) {
            throw new Error('WorkoutNutrition record is already exist');
        }
        const savedData = await WorkoutNutrition.create(workoutNutritionData);
        res.status(200).send(savedData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getWorkoutNutritionData = async (req, res) => {
    try {
        const WorkoutNutrition = await switchConnection(req.user.newDbName, "WorkoutNutrition");
        const workoutNutritionData = await WorkoutNutrition.find();
        res.status(200).send(workoutNutritionData);

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updateWorkoutNutritionData = async (req, res) => {
    try {
        const WorkoutNutrition = await switchConnection(req.user.newDbName, "WorkoutNutrition");
        const isUpdated = await WorkoutNutrition.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedWorkoutNutritionData = await WorkoutNutrition.find();
            res.send(updatedWorkoutNutritionData);
            return;
        }
        throw new Error('WorkoutNutrition data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteWorkoutNutritionData = async (req, res) => {
    try {
        const WorkoutNutrition = await switchConnection(req.user.newDbName, "WorkoutNutrition");
        const isDelete = await WorkoutNutrition.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedWorkoutNutritionData = await WorkoutNutrition.find();
            res.send(updatedWorkoutNutritionData);
            return;
        }
        throw new Error('WorkoutNutrition data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveWorkoutNutritionData,
    getWorkoutNutritionData,
    updateWorkoutNutritionData,
    deleteWorkoutNutritionData
};