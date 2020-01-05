import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const purposeSchema = new Schema({
    purposeName: { type: String, required: true },
    nSunday: { type: String, default: null },
    nMonday: { type: String, default: null },
    nTuesday: { type: String, default: null },
    nWednesday: { type: String, default: null },
    nThursday: { type: String, default: null },
    nFriday: { type: String, default: null },
    nSaturday: { type: String, default: null },
    wSunday: { type: String, default: null },
    wMonday: { type: String, default: null },
    wTuesday: { type: String, default: null },
    wWednesday: { type: String, default: null },
    wThursday: { type: String, default: null },
    wFriday: { type: String, default: null },
    wSaturday: { type: String, default: null },
    status: { type: Number, default: 1 }

});

module.exports = mongoose.model('Purpose', purposeSchema);