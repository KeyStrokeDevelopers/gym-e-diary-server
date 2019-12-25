import Staff from '../models/staff.model';
import MasterInfo from '../models/masterInfo.model'
import GymInfo from '../models/gymInfo.model';
import Access from '../models/access.model';
import Subscription from '../models/subscription.model';
import Package from '../models/package.model';
import SmsPackage from '../models/smsPackage.model';
import SmsSubscription from '../models/smsSubscription.model';
import { gymInfoField, accessLevelField, subscriptionField, 
    staffInfoField, smsSubscriptionField, masterInfoField } from '../constant/fieldFilter'
import { connectedToDatabase } from '../databaseConnection';
import bcrypt from 'bcryptjs';
import { BCRYPT_SALT_ROUNDS } from '../constant'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

export const saveGymInfo = async (req, res) => {
    try {

        // const packageData = [{
        //     packName: 'GYM-E-DIARY-TRIAL',
        //     packPrice: 0,
        //     packDuration: 7,
        //     status: 1
        // }, {
        //     packName: 'Monthly',
        //     packPrice: 300,
        //     packDuration: 1,
        //     status: 2
        // }, {
        //     packName: 'Half-Yearly',
        //     packPrice: 1600,
        //     packDuration: 6,
        //     status: 2
        // }];

        // const smsPackData = {
        //     smsPackName: 'GYM-E-DIARY-SMS-TRIAL',
        //     smsPackPrice: 0,
        //     smsPackQuantity: 20,
        //     status: 1
        // }

        // await Package.create(packageData);
        // await SmsPackage.create(smsPackData)

        // res.send('ok')

        /**
         * Filter field 
         */
        const gymInfo = gymInfoField(req.body);
        const accessLevelF = accessLevelField(req.body);
        const subscription = subscriptionField(req.body);
        const staffInfo = staffInfoField(req.body);
        const smsSubscription = smsSubscriptionField(req.body)
        const masterInfo = masterInfoField(req.body);

        accessLevelF.accessLevel = 'Admin'
        accessLevelF.status = '0'

        /**
         * Set default Password (empContact is deafult password) using bcrypt
         */
        const bcryptPassword = await bcrypt.hash(staffInfo.empContact, BCRYPT_SALT_ROUNDS);
        staffInfo.empPassword = bcryptPassword;

        /**
         * Create gyminfos table in master database
         */
        await MasterInfo.create(masterInfo);

        /**
         * Set new database of user, set database name is (db-empContact)
         */
        const newDb = `db-adfdasf`
        const isDbConSuccess = await connectedToDatabase(newDb);
        if(!isDbConSuccess) {
            res.status(401).send({message: 'Error in new database connection'})
        }

        /**
         * Save gym info, staff, access and Subscription data in staff database
         */
        await GymInfo.create(gymInfo);
        await Access.create(accessLevelF);
        await Staff.create(staffInfo);
        await Subscription.create(subscription);
        await SmsSubscription.create(smsSubscription);
        res.status(200).send({ message: 'Record save successfully' })
    } catch (err) {
        console.log('errror--', err)
        res.status(400).send(err);
    }
}