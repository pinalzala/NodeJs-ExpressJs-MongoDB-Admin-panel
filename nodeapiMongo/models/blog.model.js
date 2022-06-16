const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    blog_cats: Number,
    cat_id: String,
    txt_blogtitle: String,
    createddate: { type: Date, default: Date.now },
    txt_content: String,
    txt_mediatype: { type: String, enum: [1, 2] },
    txt_mediautub: String,
    status: { type: Number, default: 0 },
    columns: Number,
    likecount: { type: Number, default: 0 },
    commentcount: { type: Number, default: 0 },
    featured: { type: Number, default: 0 },
    blog_userid: { type: String, default: 0 },
    editor_pick: { type: Number, default: 0 },
    featured_post: { type: Number, default: 0 },
    video_frame: String,
    guest_authname_id: Number,
    guest_authemail: String,
    sources: String,
    txt_blogkeyword: String,
    meta_description: String,
    blog_news: { type: Number, default: 0 },  
    txt_mediaurl: String,
    thumbimage_name: String
});

const blog = mongoose.model("blogs",blogSchema);

module.exports = blog;
