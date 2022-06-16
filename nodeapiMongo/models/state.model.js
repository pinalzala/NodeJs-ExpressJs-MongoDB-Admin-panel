const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
    countryId: { type: Number, default: 0 },
    cityId: { type: Number, default: 0 },
    stateName: String,
    status: { type: Number, default: 0 }
});

const state = mongoose.model("states",stateSchema);

module.exports = state;
