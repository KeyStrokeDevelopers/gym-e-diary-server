const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'AddMember', required: true },
    date: Date,
    packageAttendance: { type: String, default: 'a' },
    classAttendance: { type: String, default: 'a' },
    status: { type: Number, default: 1 }

});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;