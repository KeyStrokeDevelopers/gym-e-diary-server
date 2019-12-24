import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    packName: { type: String, default: 'GYM-E-DIARY-TRIAL' },
    packPrice: { type: Number, default: 0 },
    packDuration: { type: Number, default: 7 },
    status: { type: Number, default: 1 }
});

export default model('Package', packageSchema);