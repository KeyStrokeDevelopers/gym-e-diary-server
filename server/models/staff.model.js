const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  staffImage: { type: String },
  accessLevel: { type: Schema.Types.ObjectId, ref: 'Access', required: true },
  staffName: { type: String, default: null },
  staffAddress: { type: String, default: null },
  staffContact: { type: String, required: true, unique: true },
  staffEmail: { type: String, default: null, unique: true },
  staffCode: { type: String, default: '01', unique: true },
  staffPassword: { type: String, default: null },
  staffJoiningDate: { type: Date },
  salaryDate: { type: Date },
  staffDob: { type: Date, required: true },
  deactiveDate: { type: Date },
  numberOfShift: Number,
  shiftFrom1: Date,
  shiftFrom2: Date,
  shiftFrom3: Date,
  shiftTo1: Date,
  shiftTo2: Date,
  shiftTo3: Date,
  status: { type: Number, default: 1 }

});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;