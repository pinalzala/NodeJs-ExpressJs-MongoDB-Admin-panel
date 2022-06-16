const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
fname: { type: String, required:[true, "First Name is Required"]},
lname: { type: String, required:[true, "Last Name is Required"]},
username: { type: String, required:[true, "Username is Required"]},
fbid: String,
twitterid: String,
fb_profile_image: String,
twitter_profile_image: String,
email: { type: String, required:[true, "Email id is Required"]},
password: { type: String, required:[true, "Password is Required"]},
mobile: String,
image: String,
subscribtion: { type: Number, default: 0},
status: { type: Number, default: 0},
resetTokenExpires: Date,
cr_date: { type: Date, default: Date.now},
last_login_date: Date,
shipping_address: String,
isadmin: { type: String, default: "N"},
about_us: String,
blg_user_type: Number,
is_moderator: { type: String, default: "N"},
paypal_vis: { type: Number, default: 0},
fetched: { type: Number, default: 0},
password_date: { type: Date, default: Date.now},
lp_date: { type: Date, default: Date.now},
uniqueID: String,
show_home_video: { type: Number, default: 1},
verificationToken: String,
resetToken: String,
});

const account = mongoose.model("users",accountSchema);

module.exports = account;