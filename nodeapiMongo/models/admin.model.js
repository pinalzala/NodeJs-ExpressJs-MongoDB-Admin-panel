const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    firstname: { type: String, required: [true, "First name is required"]},
    lastname: { type: String, required: [true, "Last name is required"]},
    username: { type: String, required: [true, "Username is required"]},
    password: { type: String, required: [true, "Password is required"]},
    email: { type: String, required: [true, "Email id is required"]},
    Created_date: { type: Date, default: Date.now },
    status: { type: Number, default: 0},
    user_type: { type: Number, default: 0}
});

const admin = mongoose.model("admins",adminSchema);

module.exports = admin;

