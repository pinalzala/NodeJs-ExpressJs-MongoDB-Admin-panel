const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
    country1: String,
    country_code: String,
    currency: String,
    cr_date: { type: Date, default: Date.now },
    status: { type: Number, default: 0 }
});

const country = mongoose.model("countries",countrySchema);

module.exports = country;

