const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogcatSchema = new Schema({
    txt_catname: String,
    status: { type: Number, default: 0 },
    cr_date: { type: Number, default: Date.now },
});

const blogcat = mongoose.model("blogcategorys",blogcatSchema);

module.exports = blogcat;
