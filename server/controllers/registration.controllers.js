import Register from '../models/registration.model'
import { dataFilter } from '../constant/fieldFilter'
import { REGISTER_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const saveRegisterData = async (req, res) => {
    try {
        const registerData = dataFilter(req.body, REGISTER_FIELD);
        await Register.create(registerData);
        res.status(200).send({ message: 'Register record add successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getRegisterData = async (req, res) => {
    try {
        const registerData = await Register.find();
        res.status(200).send(registerData);
    } catch (err) {
        console.log('error----',err)
        res.status(400).send(err);
    }
}