const mongoose = require('mongoose')
const moment = require('moment')
const switchConnection = require('../databaseConnection/switchDb')
const Schema = mongoose.Schema;
let newDbName;

const setDbName = (newDb) => {
    newDbName = newDb;
    return;
}

const CounterSchema = Schema({
    _id: { type: String, required: true },
    no: { type: Number, default: 0 },
    preFix: { type: String, default: null }
});
const Counter = mongoose.model('Counter', CounterSchema);

const addMemberSchema = new Schema({
    profileImage: { type: String },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    fTitle: { type: String, required: true },
    favourOf: { type: String, required: true },
    alternativeContact: { type: String },
    memberEmail: { type: String },
    dob: { type: Date },
    birthWish: { type: String },
    anniversaryWish: { type: String },
    registertionDate: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
    memberNo: { type: Number },
    regNo: { type: String },
    address: { type: String },
    occupation: { type: String },
    bloodGroup: { type: String },
    maritalStatus: { type: String },
    anniversary: { type: Date },
    query: { type: String },
    fingerCode: { type: String },
    referredBy: { type: String },
    dnd: { type: Number, default: 0 },
    callDate: Date,
    numberOfShift: Number,
    shiftFrom1: String,
    shiftFrom2: String,
    shiftFrom3: String,
    shiftTo1: String,
    shiftTo2: String,
    shiftTo3: String,
    status: { type: Number, default: 1 }
});

addMemberSchema.pre('save', async function (next) {
    try {
        const doc = this;
        const Counter = await switchConnection(newDbName, "Counter");
        const counterData = await Counter.findByIdAndUpdate({ _id: 'counterId' }, { $inc: { no: 1 } }, { new: true })
        doc.memberNo = counterData.no;
        doc.regNo = counterData.preFix ? `${counterData.preFix}/${new Date().getFullYear()}/${counterData.no}` : `${new Date().getFullYear()}/${counterData.no}`;
        next();
    } catch (err) {
        console.log('err-----', err);
        next(false);
    }
});

const AddMember = mongoose.model('AddMember', addMemberSchema);

module.exports = {
    setDbName,
    Counter,
    AddMember
};