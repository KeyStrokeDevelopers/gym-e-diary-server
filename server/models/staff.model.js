import mongoose from 'mongoose'
import { JWT_SECRET } from '../constant'
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    empId: {type: String, default: null},
    firmId: {type: String, default: null},
    branchId: {type: String, default: null},
    empLevel: {type: String, default: null},
    empName: {type: String, default: null},
    empAddress: {type: String, default: null},
    empContact: {type: String, required:true, unique: true},
    empEmail: {type: String, default:null},
    empCode: {type: String, default:null},
    empPassword: {type: String, default:null},
    joiningDate: {type: Date, default: Date.now},
    salaryDate: {type: Date, default:null},
    empDob: {type: Date, default:null},
    empStatus: {type: String, default:null},
    deactiveDate: {type: String, default: null}
});

staffSchema.methods = {
    authenticateStaff(password) {
      return compareSync(password, this.password);
    },

     hashPassword(password) { 
      return hashSync(password);
    },

    createToken() {
      return jwt.sign(
        {
          _id: this._id,
        },
        JWT_SECRET,
      );
    },
}



module.exports = mongoose.model('Staff', staffSchema);