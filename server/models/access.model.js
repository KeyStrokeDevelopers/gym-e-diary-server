import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const accessSchema = new Schema({
    accessLevel: { type: String, default: null },
    controls: { type: String, default: null },
    status: { type: String, default: null },
    dated: { type: Date, default: new Date().getTime() }
});

export default model('Access', accessSchema);