const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    countryId: { type: Number, default: 0 },
    stateId: { type: Number, default: 0 },
    cityName: String,
    cr_date: { type: Date, default: Date.now },
    status: { type: Number, default: 0 }
});

const city = mongoose.model("cities",citySchema);

module.exports = city;

