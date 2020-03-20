const { dataFilter } = require('../constant/fieldFilter')
const { EXPENSE_INCOME_FIELD, ACCOUNT_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveAccountData = async (req, res) => {
    try {
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const accountData = dataFilter(req.body, ACCOUNT_FIELD);
        /**
        * Credit entry in transaction collection
        */
        let transactionData = {};
        transactionData.member = accountData.member;
        transactionData.description = accountData.description;
        transactionData.amount = accountData.amount;
        transactionData.transactionStatus = 'Credit';
        transactionData.paymentMode = 'Method';
        transactionData.transactionType = 'Member';
        transactionData.transactionDate = accountData.date;
        transactionData.paymentModeDescription = accountData.paymentMethod;
        const account_data = await Transaction.create(transactionData);
        res.status(200).send(account_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const saveSalaryData = async (req, res) => {
    try {
        const ExpenseIncome = await switchConnection(req.user.newDbName, "ExpenseIncome");
        const salaryData = dataFilter(req.body, EXPENSE_INCOME_FIELD);
        salaryData.paymentType = 'Salary';
        const salary_data = await ExpenseIncome.create(salaryData);
        const salary = await ExpenseIncome.findOne({ _id: salary_data._id }).populate('paymentMethod');
        const salaryReport = { _id: salary._id, date: salary.date, description: salary.description, amount: salary.amount, paymentMethod: salary.paymentMethod['paymentMethod'] }
        res.status(200).send(salaryReport);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateSalaryData = async (req, res) => {
    try {
        const ExpenseIncome = await switchConnection(req.user.newDbName, "ExpenseIncome");
        const salaryData = dataFilter(req.body.data, EXPENSE_INCOME_FIELD);
        const isUpdated = await ExpenseIncome.update({ _id: req.body.data._id }, { $set: salaryData })
        if (isUpdated) {
            const expense_income_data = await ExpenseIncome.find({ $and: [{ staff: req.body.data.staff }, { $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }] }] }).populate('paymentMethod');
            const ExpenseIncomeData = expense_income_data.map(async (item) => {
                return { _id: item._id, date: item.date, description: item.description, amount: item.amount, paymentMethod: item.paymentMethod['paymentMethod'] }
            })
            const salaryData = await Promise.all(ExpenseIncomeData);
            res.status(200).send(salaryData);
            return;
        }
        throw new Error('Salary data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getSalaryData = async (req, res) => {
    try {
        const ExpenseIncome = await switchConnection(req.user.newDbName, "ExpenseIncome");
        const expense_income_data = await ExpenseIncome.find({ $and: [{ staff: req.body.staff }, { $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }] }] }).populate('paymentMethod');
        const ExpenseIncomeData = expense_income_data.map(async (item) => {
            return { _id: item._id, date: item.date, description: item.description, amount: item.amount, paymentMethod: item.paymentMethod['paymentMethod'] }
        })
        const salaryData = await Promise.all(ExpenseIncomeData);
        res.status(200).send(salaryData);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getAccountData = async (req, res) => {
    try {
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const accountData = await Transaction.find({ member: req.params.memberId });
        res.status(200).send(accountData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const updateAccountData = async (req, res) => {
    try {
        const Account = await switchConnection(req.user.newDbName, "Account");
        const isUpdated = await Account.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedAccountData = await Account.find();
            res.send(updatedAccountData);
            return;
        }
        throw new Error('Account data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteAccountData = async (req, res) => {
    try {
        const Account = await switchConnection(req.user.newDbName, "Account");
        const isDelete = await Account.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedAccountData = await Account.find();
            res.send(updatedAccountData);
            return;
        }
        throw new Error('Account data is not deleted')
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveAccountData,
    getAccountData,
    updateAccountData,
    saveSalaryData,
    getSalaryData,
    updateSalaryData,
    deleteAccountData
};