import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  accessLevel: { type: Schema.Types.ObjectId, ref: 'Access', required: true },
  empName: { type: String, default: null },
  empAddress: { type: String, default: null },
  empContact: { type: String, required: true, unique: true },
  empEmail: { type: String, default: null },
  empCode: { type: String, default: null },
  empPassword: { type: String, default: null },
  joiningDate: { type: Date, default: new Date().getTime() },
  salaryDate: { type: Date, default: null },
  empDob: { type: Date },
  empStatus: { type: String, default: null },
  deactiveDate: { type: String, default: null }
});

export default model('Staff', staffSchema);