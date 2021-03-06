const { dataFilter } = require('../constant/fieldFilter')
const { STAFF_ATTENDANCE_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveStaffAttendanceData = async (req, res) => {
    try {
        let attendanceData = dataFilter(req.body, STAFF_ATTENDANCE_FIELD);
        let attendance_data;
        const StaffAttendance = await switchConnection(req.user.newDbName, "StaffAttendance");
        const isStaffAttendanceMark = await StaffAttendance.findOne({ $and: [{ staff: req.body.staff }, { date: req.body.date }] });
        if (isStaffAttendanceMark) {
            attendance_data = await StaffAttendance.updateOne({ _id: isStaffAttendanceMark._id }, { $set: attendanceData });
        } else {
            attendance_data = await StaffAttendance.create(attendanceData);
        }
        res.status(200).send([]);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getStaffAttendanceData = async (req, res) => {
    try {
        const StaffAttendance = await switchConnection(req.user.newDbName, "StaffAttendance");
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffData = await Staff.find().populate('accessLevel');
        const staffAttendanceData = staffData.map(async (item) => {
            const staff_attendance = await StaffAttendance.findOne({ $and: [{ staff: item._id }, { date: req.body.date }] });
            let att;
            if (staff_attendance) {
                att = staff_attendance.attendance;
            } else {
                att = 'a';
            }
            return { staffId: item._id, staffName: item.staffName, attendance: att, date: req.body.date, staffAddress: item.staffAddress, staffContact: item.staffContact, staffEmail: item.staffEmail, staffCode: item.staffCode, staffAccessLevel: item.accessLevel['accessLevel'] }
        })
        const staff_data = await Promise.all(staffAttendanceData)
        res.status(200).send(staff_data);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const fetchStaffAttendanceData = async (req, res) => {
    try {
        const StaffAttendance = await switchConnection(req.user.newDbName, "StaffAttendance");
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffData = await Staff.findOne({ _id: req.body.staff }).populate('accessLevel');
        const staff_attendance = await StaffAttendance.find({ $and: [{ staff: req.body.staff }, { $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }] }] });
        const staffAttendanceData = staff_attendance.map(async (item) => {
            let att;
            if (item.attendance === 'a') {
                att = 'ABSENT';
            } else {
                att = 'PRESENT';
            }
            return { staffAttendance: att, date: item.date }
        })
        const staff_data = await Promise.all(staffAttendanceData);
        res.status(200).send(staff_data);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateStaffAttendanceData = async (req, res) => {
    try {
        const StaffAttendance = await switchConnection(req.user.newDbName, "StaffAttendance");
        const Staff = await switchConnection(req.user.newDbName, "Staff");
        const staffAttData = await StaffAttendance.findOne({ $and: [{ staff: req.body.staff }, { date: req.body.date }] });
        if (staffAttData) {
            await StaffAttendance.update({ staff: req.body.staff }, { $set: req.body })
        } else {
            await StaffAttendance.create(req.body)
        }
        const staffData = await Staff.find().populate('accessLevel');
        const staffAttendanceData = staffData.map(async (item) => {
            const staff_attendance = await StaffAttendance.findOne({ $and: [{ staff: item._id }, { date: req.body.date }] });

            console.log('staff_attendance', staff_attendance)
            return { staffId: item._id, staffName: item.staffName, attendance: staff_attendance && staff_attendance.attendance, date: req.body.date, staffAddress: item.staffAddress, staffContact: item.staffContact, staffEmail: item.staffEmail, staffCode: item.staffCode, staffAccessLevel: item.accessLevel['accessLevel'] }
        })
        const staff_data = await Promise.all(staffAttendanceData)
        res.status(200).send(staff_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteStaffAttendanceData = async (req, res) => {
    try {
        const StaffAttendance = await switchConnection(req.user.newDbName, "StaffAttendance");
        const isDelete = await StaffAttendance.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedStaffAttendanceData = await StaffAttendance.find();
            res.send(updatedStaffAttendanceData);
            return;
        }
        throw new Error('StaffAttendance data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveStaffAttendanceData,
    getStaffAttendanceData,
    fetchStaffAttendanceData,
    updateStaffAttendanceData,
    deleteStaffAttendanceData
};