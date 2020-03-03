const { dataFilter } = require('../constant/fieldFilter')
const { PAYMENT_METHOD_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const savePaymentMethodData = async (req, res) => {
    try {
        const PaymentMethod = await switchConnection(req.user.newDbName, "PaymentMethod");
        const paymentMethodData = dataFilter(req.body, PAYMENT_METHOD_FIELD);
        const isExist = await PaymentMethod.findOne({ paymentMethod: paymentMethodData.paymentMethod });
        if (isExist) {
            throw new Error('PaymentMethod record is already exist');
        }
        const payment_method = await PaymentMethod.create(paymentMethodData);
        res.status(200).send(payment_method);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getPaymentMethodData = async (req, res) => {
    try {
        const PaymentMethod = await switchConnection(req.user.newDbName, "PaymentMethod");
        const paymentMethodData = await PaymentMethod.find();
        res.status(200).send(paymentMethodData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}



const updatePaymentMethodData = async (req, res) => {
    try {
        const PaymentMethod = await switchConnection(req.user.newDbName, "PaymentMethod");
        const isUpdated = await PaymentMethod.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPaymentMethodData = await PaymentMethod.find();
            res.send(updatedPaymentMethodData);
            return;
        }
        throw new Error('PaymentMethod data is not updated')

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deletePaymentMethodData = async (req, res) => {
    try {
        const PaymentMethod = await switchConnection(req.user.newDbName, "PaymentMethod");
        const isDelete = await PaymentMethod.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedPaymentMethodData = await PaymentMethod.find();
            res.send(updatedPaymentMethodData);
            return;
        }
        throw new Error('PaymentMethod data is not deleted')

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    savePaymentMethodData,
    getPaymentMethodData,
    updatePaymentMethodData,
    deletePaymentMethodData
};