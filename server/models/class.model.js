import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema;

const classSchema = new Schema({
    className: { type: String, default: 'GYM-E-DIARY-TRIAL' },
    classDetail: { type: String, default: null },
    classFrom: { type: Date },
    classTo: { type: Date },
    durationIn: { type: String, required: true },
    classDuration: { type: Number, default: null },
    classPrice: { type: Number, default: 0 },
    isMon: { type: Boolean, default: true },
    isTue: { type: Boolean, default: true },
    isWed: { type: Boolean, default: true },
    isThu: { type: Boolean, default: true },
    isFri: { type: Boolean, default: true },
    isSat: { type: Boolean, default: true },
    isSun: { type: Boolean, default: false },

    classTakingBy: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },

    status: { type: Number, default: 1 }
});

export default model('ClassInfo', classSchema);