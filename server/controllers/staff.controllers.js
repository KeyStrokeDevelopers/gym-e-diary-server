const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { JWT_SECRET } = require('../constant')
const { STAFF_INFO_FIELD, BCRYPT_SALT_ROUNDS } = require('../constant')
const { fileDataFilter } = require('../constant/fieldFilter')
const switchConnection = require('../databaseConnection/switchDb')

const getToken = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user, "Staff");
        /**
         * Get Data =require(database for view on client side
         */
        let staffData = await Staff.findOne({ staffContact: req.body.staffContact });

        /**
         * Create jwt token for login
         */
        let user = {};
        user._id = staffData._id;
        user.newDbName = req.user;
        const token = `JWT ${jwt.sign(user, JWT_SECRET)}`;
        /**
         * Data send to client
         */
        res.status(200).send({ token: token, staffData })
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }

}

const getStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffData = await Staff.find().populate('accessLevel');
        res.status(200).send(staffData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getLogedStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffData = await Staff.findOne({ _id: req.user.loginId }).populate('accessLevel');
        res.status(200).send(staffData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const saveStaffData = async (req, res) => {
    console.log('req.body-----', req.body)
    try {
        const staffInfo = fileDataFilter(req.body, STAFF_INFO_FIELD);
        if (req.file && req.file.filename) {
            staffInfo.staffImage = req.file && req.file.filename;
        }
        console.log('staff info in save staff data ----', staffInfo)
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const isContact = await Staff.findOne(({ staffContact: staffInfo.staffContact }));
        if (isContact) {
            throw new Error('Staff contact number already registered');
        }
        const isEmail = await Staff.findOne(({ staffEmail: staffInfo.staffEmail }));
        if (isEmail) {
            throw new Error('Staff email already registered');
        }
        const isStaffCode = await Staff.findOne(({ staffCode: staffInfo.staffCode }));
        if (isStaffCode) {
            throw new Error('Staff code already registered');
        }

        const bcryptPassword = await bcrypt.hash(staffInfo.staffContact, BCRYPT_SALT_ROUNDS);
        staffInfo.staffPassword = bcryptPassword;

        await Staff.create(staffInfo);
        const staffData = await Staff.find().populate('accessLevel');
        res.status(200).send(staffData)
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const updateStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffInfo = fileDataFilter(req.body, STAFF_INFO_FIELD);
        if (req.file) {
            staffInfo.staffImage = req.file && req.file.filename;
        }
        const isUpdated = await Staff.update({ _id: req.body._id }, { $set: staffInfo })
        if (isUpdated) {
            let updatedStaffData = await Staff.find().populate('accessLevel');
            res.send(updatedStaffData);
            return;
        }
        throw new Error('Staff data is not updated')
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const isDelete = await Staff.update({ _id: req.body.dataId }, { $set: { status: 0 } })
        if (isDelete) {
            let updatedStaffData = await Staff.find().populate('accessLevel');
            res.send(updatedStaffData);
            return;
        }
        throw new Error('Staff data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}


const changePassword = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const bcryptPassword = await bcrypt.hash(req.body.staffPassword, BCRYPT_SALT_ROUNDS);
        const isChange = await Staff.updateOne({ _id: req.params.staffId }, { $set: { staffPassword: bcryptPassword } })
        if (isChange) {
            let updatedStaffData = await Staff.find().populate('accessLevel');
            // res.send(updatedStaffData);
            res.status(201).json({
                success: true,
                message: 'Password is changed successfully',
                staffData: updatedStaffData,
            });
            return;
        }
        throw new Error('Staff password is not change');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    getToken,
    getStaffData,
    saveStaffData,
    updateStaffData,
    deleteStaffData,
    changePassword,
    getLogedStaffData
};