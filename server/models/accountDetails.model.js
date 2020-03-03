const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const accountInfoSchema = new Schema({
    contact: String,
    name: String,
    email: String,
    gstNumber: String,
    state: String,
    address: String,
    bloodGroup: String,
    birthdayWishes: Boolean,
    dobWish: Date,
    accountType: String,
    anniversaryWishes: Boolean,
    anniversaryWish: Date,
    status: { type: Number, default: 1 }
});

module.exports = mongoose.model('AccountInfo', accountInfoSchema);