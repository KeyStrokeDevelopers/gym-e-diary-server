import PaymentMethod from '../models/paymentMethod.model'
import { dataFilter } from '../constant/fieldFilter'
import { PAYMENT_METHOD_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const savePaymentMethodData = async (req, res) => {
    try {
        const paymentMethodData = dataFilter(req.body, PAYMENT_METHOD_FIELD);
        await PaymentMethod.create(paymentMethodData);
        res.status(200).send({ message: 'PaymentMethod record add successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getPaymentMethodData = async (req, res) => {
    try {
        const paymentMethodData = await PaymentMethod.find();
        res.status(200).send(paymentMethodData);
    } catch (err) {
        console.log('error----',err)
        res.status(400).send(err);
    }
}