const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const classSchema = new Schema({
    className: { type: String, unique: true },
    classDetail: { type: String, default: null },
    classFrom: { type: String },
    classTo: { type: String },
    durationIn: { type: String, required: true },
    classDuration: { type: Number, default: null },
    classPrice: { type: Number, default: 0 },
    isMon: { type: Boolean, default: false },
    isTue: { type: Boolean, default: false },
    isWed: { type: Boolean, default: false },
    isThu: { type: Boolean, default: false },
    isFri: { type: Boolean, default: false },
    isSat: { type: Boolean, default: false },
    isSun: { type: Boolean, default: false },
    classTakingBy: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
    status: { type: Number, default: 1 }
});

const ClassInfo = mongoose.model('ClassInfo', classSchema);
module.exports = ClassInfo;