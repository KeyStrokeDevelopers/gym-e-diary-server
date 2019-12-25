import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constant';
import GymInfo from '../models/gymInfo.model';
import Access from '../models/access.model';
import Subscription from '../models/subscription.model';
import { loginStaffInfo } from '../constant/fieldFilter';

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
