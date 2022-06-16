const mongoose = require('mongoose');
const { Schema } = mongoose;

const cmsSchema = new Schema({
    page_name: String,
    page_slug: String,
    status: { type: Number, default: 0 },
    description: String,
    cr_date: { type: Date, default: Date.now },
});

const cms = mongoose.model("cms",cmsSchema);

module.exports = cms;

