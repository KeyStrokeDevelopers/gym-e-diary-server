import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  accessLevel: { type: Schema.Types.ObjectId, ref: 'Access', required: true },
  staffName: { type: String, default: null },
  staffAddress: { type: String, default: null },
  staffContact: { type: String, required: true, unique: true },
  staffEmail: { type: String, default: null, unique: true },
  staffCode: { type: String, default: null },
  staffPassword: { type: String, default: null },
  staffJoiningDate: { type: Date, default: Date.now() },
  salaryDate: { type: Date, default: null },
  staffDob: { type: Date, required: true },
  deactiveDate: { type: String, default: null },
  status: { type: Number, default: 1 }
});

export default model('Staff', staffSchema);