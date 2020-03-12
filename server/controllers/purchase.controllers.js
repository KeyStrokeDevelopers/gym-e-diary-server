const { dataFilter, arrayDataFilter } = require('../constant/fieldFilter')
const { VENDOR_PACKAGE_FIELD, ORDER_SUMMARY_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const savePurchaseData = async (req, res) => {

    console.log('req.body in save purchase', req.body)
    try {
        //Add data in account info collection
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        let accountInfoData = req.body.accountInfo;
        accountInfoData.accountType = 'VENDOR';
        let account_info_data;
        if (accountInfoData._id) {
            await AccountInfo.updateOne({ _id: accountInfoData._id }, { $set: accountInfoData }, { new: true });
            account_info_data = await AccountInfo.findOne({ _id: accountInfoData._id });
        } else {
            account_info_data = await AccountInfo.create(accountInfoData);
        }
        // Add data in order summary collections
        const order_summary_body_data = arrayDataFilter(req.body.orderSummary, ORDER_SUMMARY_FIELD);

        //update product collection
        let payableAmount = 0;
        const Product = await switchConnection(req.user.newDbName, "Product");
        order_summary_body_data.forEach(async (item) => {
            payableAmount = payableAmount + item.costPrice;
            const preQuantity = await Product.findOne({ _id: item.product }, { quantity: 1, _id: 0 });
            await Product.update({ _id: item.product }, { $set: { quantity: parseInt(item.quantity) + parseInt(preQuantity.quantity) } })
        })

        /**
        * Credit entry in transaction collection
        */
        let transactionData = {};
        transactionData.accountInfo = account_info_data._id;
        transactionData.description = `Purchase : ${accountInfoData.invoiceNumber}`;
        transactionData.amount = Math.round(payableAmount);
        transactionData.transactionStatus = 'Credit';
        transactionData.paymentMode = 'Goods';
        transactionData.transactionType = 'Purchase';
        let transaction_data;
        if (accountInfoData.transactionId) {
            transaction_data = await Transaction.updateOne({ _id: accountInfoData.transactionId }, { $set: transactionData });
        } else {
            transaction_data = await Transaction.create(transactionData);
        }

        //Add data in invoice collection
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        let invoiceData = {};
        invoiceData.accountInfo = account_info_data._id;
        invoiceData.transaction = transaction_data._id;
        invoiceData.date = accountInfoData.date;
        invoiceData.invoiceNumber = accountInfoData.invoiceNumber;
        invoiceData.dataType = 'Purchase';
        invoiceData.orderSummary = order_summary_body_data;

        if (accountInfoData.invoiceId) {
            await InvoiceIn.updateOne({ _id: accountInfoData.invoiceId }, { $set: invoiceData });
        } else {
            await InvoiceIn.create(invoiceData);
        }

        res.status(200).send(accountInfoData)
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


const getPurchaseData = async (req, res) => {
    try {
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const GYMINFO = await switchConnection(req.user.newDbName, "GymInfo");
        let purchase;
        if (req.body.accountInfo === 'All') {
            purchase = await InvoiceIn.find({ $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }, { status: 1 }, { dataType: 'Purchase' }] });
        } else {
            purchase = await InvoiceIn.find({ $and: [{ accountInfo: req.body.accountInfo }, { $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }] }, { status: 1 }, { dataType: 'Purchase' }] });
        }
        let purchase_data = [];
        purchase_data = purchase.map(async (data) => {
            let account_data;
            if (data['accountInfo']) {
                account_data = await AccountInfo.findOne({ _id: data['accountInfo'] });
            }
            let quantity = 0;
            let taxableAmount = 0;
            let preDiscount = 0;
            let sgst = 0;
            let cgst = 0;
            let igst = 0;
            let ugst = 0;
            let adCharge = 0;
            let netAmount = 0;
            const gym_info_data = await GYMINFO.find();
            if (data['orderSummary']) {
                data.orderSummary.map((item) => {
                    quantity = quantity + parseInt(item.quantity);
                    taxableAmount = taxableAmount + item.priceAfterDiscount;
                    preDiscount = preDiscount + item.discount;
                    if (account_data.state == 'Chandigarh' || account_data.state == 'Dadra and Nagar Haveli' || account_data.state == 'Daman and Diu' || account_data.state == 'Lakshadweep' || account_data.state == 'Puducherry' || account_data.state == 'Andaman and Nicobar Islands' || account_data.state == 'Delhi') {
                        ugst = ugst + item.gstValue;
                    } else if (account_data.state === gym_info_data[0].branchState) {
                        sgst = sgst + (item.gstValue / 2);
                        cgst = cgst + (item.gstValue / 2);
                    } else {
                        igst = igst + item.gstValue;
                    }
                    netAmount = netAmount + item.priceAfterDiscount + item.gstValue;
                })
            }
            return { invoiceId: data._id, date: data.date, invoice: data.invoiceNumber, distributor: account_data.name, quantity: quantity, taxableAmount: Math.round(taxableAmount), preDiscount: preDiscount, sgst: sgst, cgst: cgst, igst: igst, ugst: ugst, adCharge: adCharge, netAmount: Math.round(netAmount), accountData: account_data, orderSummary: data.orderSummary, transactionId: data['transaction'] }
        })
        const finalPurchaseData = await Promise.all(purchase_data);
        console.log('final purchase data ------', finalPurchaseData)
        res.status(200).send(finalPurchaseData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


const updatePurchaseData = async (req, res) => {
    try {
        const VendorPurchase = await switchConnection(req.user.newDbName, "VendorPurchase");
        const isUpdated = await VendorPurchase.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPurchaseData = await VendorPurchase.find();
            res.send(updatedPurchaseData);
            return;
        }
        throw new Error('Purchase data is not updated');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteInvoiceData = async (req, res) => {
    console.log('delete invoice data hit ------****---')
    try {
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const isDelete = await InvoiceIn.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedInvoiceData = await InvoiceIn.find();
            res.send(updatedInvoiceData);
            return;
        }
        throw new Error('Invoice data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    savePurchaseData,
    getPurchaseData,
    updatePurchaseData,
    deleteInvoiceData
};