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
        await Bank.create(bankData);
        res.status(200).send({ message: 'Bank record add successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getBankData = async (req, res) => {
    try {
        const bankData = await Bank.find();
        res.status(200).send(bankData);
    } catch (err) {
        console.log('error----',err)
        res.status(400).send(err);
    }
}