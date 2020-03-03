const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const expenseIncomeSchema = new Schema({
    catName: { type: Schema.Types.ObjectId, ref: 'Category' },
    staff: { type: Schema.Types.ObjectId, ref: 'Staff' },
    date: Date,
    paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod' },
    amount: { type: Number, default: 7 },
    description: { type: String },
    status: { type: Number, default: 1 }
});

const ExpenseIncome = mongoose.model('ExpenseIncome', expenseIncomeSchema);
module.exports = ExpenseIncome;