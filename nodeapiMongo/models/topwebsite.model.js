const mongoose = require('mongoose');
const { Schema } = mongoose;

const topwebsiteSchema = new Schema({
    page_name: Number,
    page_link: String,
    counts: String,
    date: Date
});

const topwebsite = mongoose.model("top_website_pages",topwebsiteSchema);

module.exports = topwebsite;
