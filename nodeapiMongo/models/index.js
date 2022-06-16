const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.account = require("./account.model");
db.admin = require("./admin.model");
db.banner = require("./banner.model");
db.blog = require("./blog.model");
db.blogcat = require("./blogcat.model");
db.blogtag = require("./blogtag.model");
db.city = require("./city.model");
db.cms = require("./cms.model");
db.contactdata = require("./contactdata.model");
db.country = require("./country.model");
db.faq = require("./faq.model");
db.state = require("./state.model");
db.topwebsite = require("./topwebsite.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;