const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveAttendanceData = async (req, res) => {
    try {
        let attendanceData = {};
        if (req.body.attendanceType === 'forBoth') {
            attendanceData = { member: req.body.member, date: req.body.date, packageAttendance: req.body.attendance, classAttendance: req.body.attendance };
        } else {
            if (req.body.subscriptionType === 'Package') {
                attendanceData = { member: req.body.member, date: req.body.date, packageAttendance: req.body.attendance11, classAttendance: 'a' };
            } else if (req.body.subscriptionType === 'Class') {
                attendanceData = { member: req.body.member, date: req.body.date, classAttendance: req.body.attendance11, packageAttendance: 'a' };
            } else {
                attendanceData = { member: req.body.member, date: req.body.date, packageAttendance: req.body.attendance11, classAttendance: req.body.attendance };
            }
        }
        let attendance_data;
        const Attendance = await switchConnection(req.user.newDbName, "Attendance");
        const isAttendanceMark = await Attendance.findOne({ $and: [{ member: req.body.member }, { date: req.body.date }] });
        if (isAttendanceMark) {
            attendance_data = await Attendance.updateOne({ _id: isAttendanceMark._id }, { $set: attendanceData });
        } else {
            attendance_data = await Attendance.create(attendanceData);
        }
        res.status(200).send(attendance_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getAttendanceData = async (req, res) => {
    try {
        const Attendance = await switchConnection(req.user.newDbName, "Attendance");
        const attendanceData = await Attendance.find({ $and: [{ member: req.body.member }, { $and: [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }] }] });
        const attendance_data = attendanceData.map((item) => {
            let packAtt;
            let classAtt;
            if (item.packageAttendance === 'a') {
                packAtt = 'ABSENT';
            } else {
                packAtt = 'PRESENT';
            }
            if (item.classAttendance === 'a') {
                classAtt = 'ABSENT';
            } else {
                classAtt = 'PRESENT';
            }
            return { date: item.date, packAttendance: packAtt, classAttendance: classAtt };
        })
        res.status(200).send(attendance_data);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateAttendanceData = async (req, res) => {
    try {
        const Attendance = await switchConnection(req.user.newDbName, "Attendance");
        const isUpdated = await Attendance.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedAttendanceData = await Attendance.find();
            res.send(updatedAttendanceData);
            return;
        }
        throw new Error('Attendance data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteAttendanceData = async (req, res) => {
    try {
        const Attendance = await switchConnection(req.user.newDbName, "Attendance");
        const isDelete = await Attendance.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedAttendanceData = await Attendance.find();
            res.send(updatedAttendanceData);
            return;
        }
        throw new Error('Attendance data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveAttendanceData,
    getAttendanceData,
    updateAttendanceData,
    deleteAttendanceData
};