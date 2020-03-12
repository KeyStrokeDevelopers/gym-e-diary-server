const { dataFilter, arrayDataFilter } = require('../constant/fieldFilter')
const { VENDOR_PACKAGE_FIELD, ORDER_SUMMARY_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveSaleData = async (req, res) => {
    console.log('req.body -------', req.body.billInfo.paidAmount)
    try {
        // Add data in account info collection
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const InvoiceNumberCounter = await switchConnection(req.user.newDbName, "InvoiceNumberCounter");
        const Product = await switchConnection(req.user.newDbName, "Product");

        let accountInfoData = req.body.customerInfo;
        accountInfoData.accountType = 'Customer';

        let isAlreadyInserted = await AccountInfo.findOne({ $and: [{ contact: accountInfoData.contact }, { email: accountInfoData.email }, { accountType: 'Customer' }] });

        let account_info_data;
        if (isAlreadyInserted) {
            await AccountInfo.updateOne({ _id: isAlreadyInserted._id }, { $set: accountInfoData }, { new: true });
            account_info_data = await AccountInfo.findOne({ _id: isAlreadyInserted._id });
        } else {
            account_info_data = await AccountInfo.create(accountInfoData);
        }
        // Add data in order summary collections
        const order_summary_body_data = arrayDataFilter(req.body.orderSummary, ORDER_SUMMARY_FIELD);

        //Check stock availability
        order_summary_body_data.forEach(async (item) => {
            let orderQuantity = 0;
            const preQuantity = await Product.findOne({ _id: item.product }, { quantity: 1, _id: 0 });
            order_summary_body_data.forEach((orderItem) => {
                //Add same type product quantity of order summary
                if (item.product === orderItem.product) {
                    orderQuantity = orderQuantity + orderItem.quantity
                }
            })
            if (orderQuantity > preQuantity.quantity) {
                res.status(200).json({ message: 'Product is out of stock', data: {} });
                return;
            }
        })

        //update product collection
        let payableAmount = 0;
        order_summary_body_data.forEach(async (item) => {
            payableAmount = payableAmount + item.costPrice;
            const preQuantity = await Product.findOne({ _id: item.product }, { quantity: 1, _id: 0 });
            await Product.update({ _id: item.product }, { $set: { quantity: parseInt(preQuantity.quantity) - parseInt(item.quantity) } })
        })

        //Create new Invoice no
        const isInvoiceNo = await InvoiceNumberCounter.findOne({ _id: 'InvoiceCounterId' });
        if (!isInvoiceNo) {
            await InvoiceNumberCounter.create({ _id: 'InvoiceCounterId' });
        }

        const invoiceCounterData = await InvoiceNumberCounter.findByIdAndUpdate({ _id: 'InvoiceCounterId' }, { $inc: { invoiceNumber: 1 } }, { new: true })

        /**
        * Credit entry in transaction collection
        */
        let transactionData = {};
        transactionData.accountInfo = account_info_data._id;
        transactionData.description = `Sale : ${invoiceCounterData.invoiceNumber}`;
        transactionData.amount = Math.round(payableAmount);
        transactionData.transactionStatus = 'Debit';
        transactionData.paymentMode = 'Goods';
        transactionData.transactionType = 'Sale';
        let transaction_data;
        if (accountInfoData.transactionId) {
            transaction_data = await Transaction.updateOne({ _id: accountInfoData.transactionId }, { $set: transactionData });
        } else {
            transaction_data = await Transaction.create(transactionData);
        }


        /**
     * Credit entry in transaction collection
     */
        if (req.body.billInfo.paidAmount > 0) {
            let transactionData = {};
            transactionData.member = account_info_data._id;
            transactionData.description = `Payment for Sale: ${invoiceCounterData.invoiceNumber}`;
            transactionData.amount = req.body.billInfo.paidAmount;
            transactionData.transactionStatus = 'Credit';
            transactionData.paymentMode = 'Method';
            transactionData.transactionType = 'Sale';
            transactionData.paymentModeDescription = req.body.billInfo.paymentMode;
            await Transaction.create(transactionData);
        }

        //Add data in invoice collection
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        let invoiceData = {};
        invoiceData.accountInfo = account_info_data._id;
        invoiceData.transaction = transaction_data._id;
        invoiceData.date = req.body.billInfo.date;
        invoiceData.dataType = 'Sale';
        invoiceData.invoiceNumber = invoiceCounterData.invoiceNumber;
        invoiceData.orderSummary = order_summary_body_data;

        if (accountInfoData.invoiceId) {
            await InvoiceIn.updateOne({ _id: accountInfoData.invoiceId }, { $set: invoiceData });
        } else {
            await InvoiceIn.create(invoiceData);
        }
        res.status(200).send(accountInfoData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getSaleData = async (req, res) => {
    try {
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const GYMINFO = await switchConnection(req.user.newDbName, "GymInfo");
        let sale = await InvoiceIn.find({ $and: [{ $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }] }, { status: 1 }, { dataType: 'Sale' }] });
        let sale_data = [];
        sale_data = sale.map(async (data) => {
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
            return { invoiceId: data._id, date: data.date, invoice: data.invoiceNumber, customer: account_data.name, quantity: quantity, taxableAmount: Math.round(taxableAmount), preDiscount: preDiscount, sgst: sgst, cgst: cgst, igst: igst, ugst: ugst, adCharge: adCharge, netAmount: Math.round(netAmount), accountData: account_data, orderSummary: data.orderSummary, transactionId: data['transaction'] }
        })
        const finalSaleData = await Promise.all(sale_data);
        res.status(200).send(finalSaleData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


const updateSaleData = async (req, res) => {
    try {
        const VendorSale = await switchConnection(req.user.newDbName, "VendorSale");
        const isUpdated = await VendorSale.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedSaleData = await VendorSale.find();
            res.send(updatedSaleData);
            return;
        }
        throw new Error('Sale data is not updated');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteInvoiceData = async (req, res) => {
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



const cancelSaleData = async (req, res) => {
    try {
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const Product = await switchConnection(req.user.newDbName, "Product");
        req.body.orderSummary.forEach(async (item, index) => {
            const savedQuantity = await Product.findOne({ _id: item.product }, { quantity: 1, _id: 0 });
            let quantity = parseInt(savedQuantity.quantity) + parseInt(req.body.orderSummary[index].quantity)
            await Product.update({ _id: item.product }, { $set: { quantity: quantity } })
        })
        const isDelete = await InvoiceIn.update({ _id: req.body.invoiceId }, { $set: { status: 0 } })
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



const getCancelSaleData = async (req, res) => {
    try {
        const AccountInfo = await switchConnection(req.user.newDbName, "AccountInfo");
        const InvoiceIn = await switchConnection(req.user.newDbName, "InvoiceIn");
        const GYMINFO = await switchConnection(req.user.newDbName, "GymInfo");
        let sale = await InvoiceIn.find({ $and: [{ $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }] }, { status: 0 }, { dataType: 'Sale' }] });
        let sale_data = [];
        sale_data = sale.map(async (data) => {
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
            return { invoiceId: data._id, date: data.date, invoice: data.invoiceNumber, customer: account_data.name, quantity: quantity, taxableAmount: Math.round(taxableAmount), preDiscount: preDiscount, sgst: sgst, cgst: cgst, igst: igst, ugst: ugst, adCharge: adCharge, netAmount: Math.round(netAmount), accountData: account_data, orderSummary: data.orderSummary, transactionId: data['transaction'] }
        })
        const finalSaleData = await Promise.all(sale_data);
        res.status(200).send(finalSaleData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveSaleData,
    getSaleData,
    updateSaleData,
    deleteInvoiceData,
    cancelSaleData,
    getCancelSaleData
};