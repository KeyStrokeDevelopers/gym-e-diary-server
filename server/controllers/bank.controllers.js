import Bank from '../models/bank.model'
import { dataFilter } from '../constant/fieldFilter'
import { BANK_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const saveBankData = async (req, res) => {
    try {
        const bankData = dataFilter(req.body, BANK_FIELD);
        console.log('bank data after filter ----', bankData)
        const savedData = await Bank.create(bankData);
        setTimeout(() => {
            res.status(200).send(savedData)
        }, 5000)
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getBankData = async (req, res) => {
    console.log('get Bank data hit ----');
    try {
        const bankData = await Bank.find();
        console.log('bank data in get bank data -----', bankData);
        res.status(200).send(bankData);

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err);
    }
}

export const updateBankData = async (req, res) => {
    console.log('req.id in updated bank data ---', req.body._id)
    try {

        const isUpdated = await Bank.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedBankData = await Bank.find();
            res.send(updatedBankData);
            return;
        }
        res.status(400).send({ message: 'Bank data is not updated' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}

export const deleteBankData = async (req, res) => {
    try {
        const isDelete = await Bank.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedBankData = await Bank.find();
            res.send(updatedBankData);
            return;
        }
        res.status(400).send({ message: 'Bank data is not deleted' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}