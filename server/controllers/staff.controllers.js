const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { JWT_SECRET, GYM_INFO_FIELD } = require('../constant')
const { STAFF_INFO_FIELD, BCRYPT_SALT_ROUNDS } = require('../constant')
const { fileDataFilter, GetObjectData } = require('../constant/fieldFilter')

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
        res.status(400).json({ message: err.message })
    }

}

const getStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffData = await Staff.find().populate('accessLevel');
        res.status(200).send(staffData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getLogedStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const GymInfo = await switchConnection(req.user.newDbName, "GymInfo");
        const Counter = await switchConnection(req.user.newDbName, "Counter");
        const staffData = await Staff.findOne({ _id: req.user.loginId }).populate('accessLevel');
        const GymInfoData = await GymInfo.findOne();
        const counterData = await Counter.find();
        let gymData = GetObjectData(GymInfoData, GYM_INFO_FIELD);
        if (counterData && counterData.length >= 1) {
            gymData.isCounterOn = counterData.length >= 1 ? true : false;
            gymData.preFix = counterData[0].preFix;
        }
        const data = { staffData, gymData }
        res.status(200).send(data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const saveStaffData = async (req, res) => {
    try {
        const staffInfo = fileDataFilter(req.body, STAFF_INFO_FIELD);
        if (req.file && req.file.filename) {
            staffInfo.staffImage = req.file && req.file.filename;
        }
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const isContact = await Staff.findOne({ $and: [{ staffContact: staffInfo.staffContact }, { status: 1 }] });
        if (isContact) {
            throw new Error('Staff contact number already registered');
        }
        const isEmail = await Staff.findOne({ $and: [{ staffEmail: staffInfo.staffEmail }, { status: 1 }] });
        if (isEmail) {
            throw new Error('Staff email already registered');
        }
        const isStaffCode = await Staff.findOne({ $and: [{ staffCode: staffInfo.staffCode }, { status: 1 }] });
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
        res.status(400).json({ message: err.message })
    }
}


const updateStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffInfo = fileDataFilter(req.body, STAFF_INFO_FIELD);
        if (req.file) {
            var index = req.file.filename.indexOf("/");
            if (index < 0) {
                staffInfo.staffImage = req.file.filename;
            }
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
        res.status(400).json({ message: err.message })
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
        res.status(400).json({ message: err.message })
    }
}

const activeStaffData = async (req, res) => {
    try {
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const isActive = await Staff.update({ _id: req.params.dataId }, { $set: { status: 1 } })
        if (isActive) {
            let updatedStaffData = await Staff.find().populate('accessLevel');
            res.send(updatedStaffData);
            return;
        }
        throw new Error('Staff data is not activated');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
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
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getToken,
    getStaffData,
    saveStaffData,
    updateStaffData,
    deleteStaffData,
    activeStaffData,
    changePassword,
    getLogedStaffData
};