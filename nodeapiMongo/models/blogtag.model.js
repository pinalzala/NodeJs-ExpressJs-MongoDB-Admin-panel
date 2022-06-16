const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogtagSchema = new Schema({
    blog_id: { type: String, default: 0 },
    tags: String,
    create_date: { type: Date, default: Date.now }
});

const blogtag = mongoose.model("blog_tags",blogtagSchema);

module.exports = blogtag;

