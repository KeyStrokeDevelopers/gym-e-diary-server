import mongoose from 'mongoose'
Schema = mongoose.Schema;

const accessSchema = new Schema({
    accessLevel: {type: String, default: null},
    controls: {type: String, default: null},
    status: {type: String, default: null},
    code: {type: String, default: null},
    dated: {type: Date, default: null},
});

module.exports = mongoose.model('Access', accessSchema);