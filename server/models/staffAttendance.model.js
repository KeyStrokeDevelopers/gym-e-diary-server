const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    staff: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
    date: Date,
    attendance: { type: String, default: 'a' },
    status: { type: Number, default: 1 }

});

const StaffAttendance = mongoose.model('StaffAttendance', attendanceSchema);
module.exports = StaffAttendance;