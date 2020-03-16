const { dataFilter } = require('../constant/fieldFilter')
const { EXPENSE_INCOME_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveExpenseIncomeData = async (req, res) => {
    try {
        const expenseIncomeInfo = dataFilter(req.body, EXPENSE_INCOME_FIELD);
        const ExpenseIncome = await switchConnection(req.user.newDbName, "ExpenseIncome");
        await ExpenseIncome.create(expenseIncomeInfo);
        const expenseIncomeData = await ExpenseIncome.find().populate('catName').populate('paymentMethod');
        res.status(200).send(expenseIncomeData)
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getExpenseIncomeData = async (req, res) => {
    try {
        const ExpenseIncome = await switchConnection(req.user.newDbName, "ExpenseIncome");
        const expenseIncomeData = await ExpenseIncome.find().populate('catName').populate('paymentMethod');
        res.status(200).send(expenseIncomeData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


const updateExpenseIncomeData = async (req, res) => {
    try {
        const ExpenseIncome = await switchConnection(req.user.newDbName, "ExpenseIncome");
        const isUpdated = await ExpenseIncome.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedExpenseIncomeData = await ExpenseIncome.find().populate('catName').populate('paymentMethod');
            res.send(updatedExpenseIncomeData);
            return;
        }
        throw new Error('ExpenseIncome data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteExpenseIncomeData = async (req, res) => {
    try {
        const ExpenseIncome = await switchConnection(req.user.newDbName, "ExpenseIncome");
        const isDelete = await ExpenseIncome.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedExpenseIncomeData = await ExpenseIncome.find().populate('catName').populate('paymentMethod');
            res.send(updatedExpenseIncomeData);
            return;
        }
        throw new Error('ExpenseIncome data is not deleted')

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveExpenseIncomeData,
    getExpenseIncomeData,
    updateExpenseIncomeData,
    deleteExpenseIncomeData
};