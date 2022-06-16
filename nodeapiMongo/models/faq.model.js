const mongoose = require('mongoose');
const { Schema } = mongoose;

const faqSchema = new Schema({
    product_id: Number,
    question: String,
    answer: String,
    cr_date: { type: Date, default: Date.now },
});

const faq = mongoose.model("faqs",faqSchema);

module.exports = faq;
