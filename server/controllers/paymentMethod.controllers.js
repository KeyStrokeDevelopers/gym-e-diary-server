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
        console.log('error----', err)
        res.status(400).send(err);
    }
}



export const updatePaymentMethodData = async (req, res) => {
    try {

        const isUpdated = await PaymentMethod.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedPaymentMethodData = await PaymentMethod.find();
            res.send(updatedPaymentMethodData);
            return;
        }
        res.status(400).send({ message: 'PaymentMethod data is not updated' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}

export const deletePaymentMethodData = async (req, res) => {
    try {
        const isDelete = await PaymentMethod.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedPaymentMethodData = await PaymentMethod.find();
            res.send(updatedPaymentMethodData);
            return;
        }
        res.status(400).send({ message: 'PaymentMethod data is not deleted' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}