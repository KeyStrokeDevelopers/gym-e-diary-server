import AddMember from '../models/addMember.model'
import { dataFilter } from '../constant/fieldFilter'
import { REGISTER_FIELD } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const saveAddMemberData = async (req, res) => {
    try {
        const addMemberData = dataFilter(req.body, REGISTER_FIELD);
        await AddMember.create(addMemberData);
        res.status(200).send({ message: 'AddMember record add successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}

export const getAddMemberData = async (req, res) => {
    try {
        const addMemberData = await AddMember.find();
        res.status(200).send(addMemberData);
    } catch (err) {
        console.log('error----',err)
        res.status(400).send(err);
    }
}