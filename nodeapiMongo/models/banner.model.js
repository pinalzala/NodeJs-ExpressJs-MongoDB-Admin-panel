const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerSchema = new Schema({
    banner_image: String,
    banner_caption: String,
    cr_date: { type: Date, default: Date.now },
    status: { type: Number, default: 0},
    banner_url: String,
    reference: String,
    description: String,
    title: String,
});

const banner = mongoose.model("banner",bannerSchema);

module.exports = banner;

