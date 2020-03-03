const { fileDataFilter } = require('../constant/fieldFilter')
const { MEDIA_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveOrderSummaryData = async (req, res) => {
    try {
        const orderSummaryData = fileDataFilter(req.body, MEDIA_FIELD);
        const OrderSummary = await switchConnection(req.user.newDbName, "OrderSummary");
        const order_Summary_Data = await OrderSummary.create(orderSummaryData);
        res.status(200).send(order_Summary_Data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getOrderSummaryData = async (req, res) => {
    try {
        const OrderSummary = await switchConnection(req.user.newDbName, "OrderSummary");
        const orderSummaryData = await OrderSummary.find();
        res.status(200).send(orderSummaryData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updateOrderSummaryData = async (req, res) => {
    try {
        const OrderSummary = await switchConnection(req.user.newDbName, "OrderSummary");
        const isUpdated = await OrderSummary.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedOrderSummaryData = await OrderSummary.find();
            res.send(updatedOrderSummaryData);
            return;
        }
        throw new Error('OrderSummary data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteOrderSummaryData = async (req, res) => {
    try {
        const OrderSummary = await switchConnection(req.user.newDbName, "OrderSummary");
        const isDelete = await OrderSummary.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedOrderSummaryData = await OrderSummary.find();
            res.send(updatedOrderSummaryData);
            return;
        }
        throw new Error('OrderSummary data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveOrderSummaryData,
    getOrderSummaryData,
    updateOrderSummaryData,
    deleteOrderSummaryData
};