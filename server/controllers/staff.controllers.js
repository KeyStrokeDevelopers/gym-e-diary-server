import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constant';
import GymInfo from '../models/gymInfo.model';
import Access from '../models/access.model';
import Subscription from '../models/subscription.model';
import { loginStaffInfo } from '../constant/fieldFilter';
import { STAFF_INFO_FIELD } from '../constant'
import { dataFilter } from '../constant/fieldFilter'
import Staff from '../models/staff.model';

export const getToken = async (req, res) => {
    try {
        console.log('user in get token----', req.user);
        /**
         * Get Data from database for view on client side
         */
        let gymInfoData = await GymInfo.findOne();
        let accessData = await Access.find();
        // Subscription Data only today date (between start and renewal data)
        let subscriptionData = await Subscription.find();
        /**
         * Filter data
         */
        let staffInfo = loginStaffInfo(req.user);
        /**
         * Create jwt token for login
         */
        let user = {};
        user._id = req.user._id
        const token = `JWT ${jwt.sign(user, JWT_SECRET)}`;
        /**
         * Data send to client
         */
        res.status(200).send({
            token: token,
            staffInfo: staffInfo,
            gymInfo: gymInfoData,
            accessInfo: accessData,
            subscriptionInfo: subscriptionData
        })
    } catch (err) {
        console.log('error-----', err);
        res.status(401).send(err);
    }

}

export const getStaffData = async (req, res) => {
    try {
        const staffData = await Staff.find();
        res.status(200).send(staffData);
    } catch (err) {
        console.log('error-----', err);
        res.status(401).send(err);
    }
}

export const saveStaffData = async (req, res) => {
    try {
        const staffInfo = dataFilter(req.body, STAFF_INFO_FIELD);

        const isExist = await Staff.findOne(({ staffContact: staffInfo.staffContact }));
        if (isExist) {
            res.status(401).send({ message: 'Staff contact number already registered' })
            return
        }

        const bcryptPassword = await bcrypt.hash(staffInfo.staffContact, BCRYPT_SALT_ROUNDS);
        staffInfo.staffPassword = bcryptPassword;
        staffInfo.staffDob = new Date(req.body.staffDob).getTime();
        if (req.body.staffJoindDate) {
            staffInfo.staffDob = new Date(req.body.staffDob).getTime();
        }

        await Staff.create(staffInfo);
        res.status(200).send({ message: 'Staff Record save successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err);
    }
}


export const updateStaffData = async (req, res) => {
    try {

        const isUpdated = await Staff.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedStaffData = await Staff.find();
            res.send(updatedStaffData);
            return;
        }
        res.status(400).send({ message: 'Staff data is not updated' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}

export const deleteStaffData = async (req, res) => {
    try {
        const isDelete = await Staff.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedStaffData = await Staff.find();
            res.send(updatedStaffData);
            return;
        }
        res.status(400).send({ message: 'Staff data is not deleted' })

    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err)
    }
}