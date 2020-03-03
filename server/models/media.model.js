const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    image: { type: String },
    member: { type: Schema.Types.ObjectId, ref: 'AddMember', required: true },
    date: { type: Date },
    description: { type: String },
    status: { type: Number, default: 1 }
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;