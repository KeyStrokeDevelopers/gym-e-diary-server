const { GYM_INFO_FIELD, STAFF_INFO_FIELD, SUBSCRIPTION_FIELD, ACCESS_LEVEL_FIELD, SMS_SUBSCRIPTION_FIELD } = require('../constant')
const { dataFilter } = require('../constant/fieldFilter')
const bcrypt = require('bcryptjs')
const { BCRYPT_SALT_ROUNDS } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const saveRegistrationData = async (req, res) => {
    console.log('req.body in save regi-----', req.body)
    try {
        /**
         * Filter field 
         */
        const gymInfo = dataFilter(req.body, GYM_INFO_FIELD);
        const accessLevelF = dataFilter(req.body, ACCESS_LEVEL_FIELD);
        const subscription = dataFilter(req.body, SUBSCRIPTION_FIELD);
        const staffInfo = dataFilter(req.body, STAFF_INFO_FIELD);
        const smsSubscription = dataFilter(req.body, SMS_SUBSCRIPTION_FIELD)
        const masterInfo = {};

        accessLevelF.accessLevel = 'Adminstrator'
        accessLevelF.status = '2'

        /**
         * set member no
         */
        const memberCounter = {};
        memberCounter._id = 'counterId';


        /**
         * Set default Password (staffContact is deafult password) using bcrypt
         */
        const bcryptPassword = await bcrypt.hash(staffInfo.staffContact, BCRYPT_SALT_ROUNDS);
        staffInfo.staffPassword = bcryptPassword;
        /**
         * , Set new database name
         */
        const newDb = `db-${Math.round(Math.random() * 1000000 + new Date().getTime())}`

        /**
         * Create master information in master database
         */
        masterInfo.branchContact = gymInfo.branchContact;
        masterInfo.newDbName = newDb;

        const MasterInfo = await switchConnection("gym-e-master", "MasterInfo");

        const isExist = await MasterInfo.findOne(({ branchContact: gymInfo.branchContact }));

        if (isExist) {
            res.status(401).send({ error: 'GYM contact number already registered' })
            return
        }
        await MasterInfo.create(masterInfo);

        /**
         * Set new database of user
         */

        const Staff = await switchConnection(newDb, "Staff");
        const GymInfo = await switchConnection(newDb, "GymInfo");
        const Subscription = await switchConnection(newDb, "MasterPackageSubscription");
        const Access = await switchConnection(newDb, "Access");
        const SmsSubscription = await switchConnection(newDb, "SmsSubscription");
        const Counter = await switchConnection(newDb, "Counter");

        /**
         * Save gym info, staff, access and Subscription data in staff database
         */
        await GymInfo.create(gymInfo);
        await Counter.create(memberCounter);
        const access = await Access.create(accessLevelF);
        staffInfo.accessLevel = access._id;
        await Staff.create(staffInfo);
        await Subscription.create(subscription);
        await SmsSubscription.create(smsSubscription);

        res.status(200).send({ message: 'Record save successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveRegistrationData
};

// If error occour at any postion then remove database =require(master and all recored remove =require(db
// TODO