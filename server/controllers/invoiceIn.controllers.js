const { fileDataFilter } = require('../constant/fieldFilter')
const { MEDIA_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveInvoiceInData = async (req, res) => {
    try {
        const invoiceData = fileDataFilter(req.body, MEDIA_FIELD);
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const invoice_Data = await InvoiceIn.create(invoiceData);
        res.status(200).send(invoice_Data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getInvoiceInData = async (req, res) => {
    try {
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        let invoiceData;
        if (req.body.accountInfo === 'All') {
            invoiceData = await InvoiceIn.find();
        } else {
            invoiceData = await InvoiceIn.find({ accountInfo: req.body.accountInfo });
        }
        res.status(200).send(invoiceData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updateInvoiceInData = async (req, res) => {
    try {
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const isUpdated = await InvoiceIn.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedInvoiceInData = await InvoiceIn.find();
            res.send(updatedInvoiceInData);
            return;
        }
        throw new Error('InvoiceIn data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteInvoiceInData = async (req, res) => {
    try {
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const isDelete = await InvoiceIn.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedInvoiceInData = await InvoiceIn.find();
            res.send(updatedInvoiceInData);
            return;
        }
        throw new Error('InvoiceIn data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveInvoiceInData,
    getInvoiceInData,
    updateInvoiceInData,
    deleteInvoiceInData
};