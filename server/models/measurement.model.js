const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const measurementSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'AddMember', required: true },
    date: Date,
    weight: String,
    height: String,
    neck: String,
    shoulder: String,
    chestExtended: String,
    chestNormal: String,
    forearms: String,
    biceps: String,
    wrist: String,
    upper: String,
    lower: String,
    waist: String,
    hip: String,
    thigh: String,
    calves: String,
    ankles: String,
    blood: String,
    sugar: String,
    fat: String,
    bmi: String,
    bmr: String,
    medicalHistory: String,
    status: { type: Number, default: 1 }
});

const Measurement = mongoose.model('Measurement', measurementSchema);
module.exports = Measurement;