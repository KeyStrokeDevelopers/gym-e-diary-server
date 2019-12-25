import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const masterInfoSchema = new Schema({
    gymContact: { type: String, default: null, unique: true, required: true },
    newDbName: { type: String, default: null, unique: true, required: true }
});

export default model('MasterInfo', masterInfoSchema);