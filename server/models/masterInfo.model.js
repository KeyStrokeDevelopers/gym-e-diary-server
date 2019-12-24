import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const masterInfoSchema = new Schema({
    gymContact: { type: String, default: null, unique: true },
    newDbName: { type: String, default: null, unique: true }
});

export default model('MasterInfo', masterInfoSchema);