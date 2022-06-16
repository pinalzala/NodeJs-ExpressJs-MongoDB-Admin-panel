const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactdataSchema = new Schema({
    text_desc: String,
    mobile: String,
    email: String,
    address: String,
    worktime: String,
    latitude: String,
    longitude: String,
});

const contactdata = mongoose.model("contacts",contactdataSchema);

module.exports = contactdata;
