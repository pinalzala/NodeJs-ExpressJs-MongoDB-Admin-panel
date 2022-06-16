const config = require('../config.json');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { sendEmail, sendEmailAttachment } = require('../_helpers/send-email');
const db = require('../models');
var md5 = require('md5');

module.exports = {
  getpassword,
  usermanagement,
  updateadmindata,
  addblogadmin,
  updateblogadmin,
  getadmindata,
  addlogin,
  statuschangeblog,
  statuschangeblogcat,
  blogcategory,
  blogcategorybyid,
  blogdelete,
  getblog,
  getblogbyid,
  getcontactbyid,
  addcontact,
  addfaq,
  updatefaq,
  getfaqbyid,
  getallcms,
  addcms,
  updatecms,
  getcmsbyid,
  deletecontact,
  deletefaq,
  getalladmin,
  register,
  statuschangecms,
  updatebanner,
  faq,
  getallbanner,
  getallbanneradmin,
  getuserid,
  getbannerbyid,
  cms,
  addbanner,
  importuser,
  //users
  getAllusers,
  getAllusersfront,
  adduser,
  addblogcategory,
  updateuser,
  updateblogcategory,
  updatecontact,
  getuser,
  deleteuser,
  deleteblogcategory,
  deletebanner,
  deletemultiuser,
  deletemultibanner,
  approvemultiuser,
  rejectmultiuser,
  inactivemultibanner,
  activemultibanner,
  contactdata,
  getallcontactadmin,
  changepasswordadmin,
  getAllcountry,
  getAllcountryadmin

};
/*login process*/
async function addlogin(params, origin) {
  var txt_username = params.username;
  var txt_password = params.password;

  console.log('params', params);

  var findLogin = await db.admin.find({ $or : [{ username : txt_username }, { email : txt_username }], password : md5(txt_password), status : { $ne : 2 } });

  if(findLogin){
    return { 'status': 'success', 'datam': findLogin[0] }
  }
  else{
    return { 'status': 'error', 'datam': 'login failed' }
  }
}

async function changepasswordadmin(params, origin) {

  var result_success = await db.admin.findOneAndUpdate({ _id : params.adminid }, {$set : { password : md5(params.password)} });

  console.log(result_success);

  if (result_success){
    return { 'status': 'success', 'message': 'password change Succesfullly' }
  }
  else {
    return { 'status': 'error', 'datam': 'password change Failed' }
  }
}

async function getpassword(params, origin) {

  var password = md5(params.password);
  var result = await db.admin.findOne({});
 
  console.log(result.password);
  var oldpassword = result.password;

  if (password == oldpassword) {
    return { 'status': 'success', 'message': 'password get Succesfullly', 'adminid': result._id }
  }
  else {
    return { 'status': 'error', 'message': 'password get Failed' }
  }

}




async function getcontactbyid(id) {

  const account = await db.contactdata.findOne({ _id: id });
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }
  return account;

}

async function getfaqbyid(id) {
  const account = await db.faq.findOne({ _id: id });
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }
  return account;
}

async function getcmsbyid(id) {
  const account = await db.cms.findOne({ _id: id });
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };
  }
  return account;
}

async function usermanagement() {
  var getquestionIdinco = await db.admin.find({ status : { $ne : 2 }, user_type : { $in : [0,1] } }, null, { $sort : {firstname : -1}});
console.log("user",getquestionIdinco);
  return getquestionIdinco;
}

async function updatefaq(id, params) {

  const account = await db.faq.findOne({ _id : id });
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };

  }

  await db.faq.findOneAndUpdate({ _id : id }, { $set : params });

  return data = { status: 'success', message: 'Update Faq successful.' };

}

async function updatecms(id, params) {

  var getquestionIdinco = await db.cms.find({ status : { $ne : 2 }, _id : { $ne : id }, $or : [ {page_name : params.page_name}, {page_slug : params.page_slug} ] })

  if (getquestionIdinco) {
    return data = { status: 'error', message: 'CMS already exist.Please try again.' };
  }

  const account = await db.cms.findOne({ where: { _id: id } });
  // validate (if email was changed)
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };
  }

  await db.cms.findOneAndUpdate({ _id : id }, { $set : params }); 

  return data = { status: 'success', message: 'Update Cms successful.' };

}


async function updatecontact(id, params) {

  const account = await db.contactdata.findOne({ _id: id });
  if (!account) {
    return data = { status: 'error', message: 'Data Not Found' };
  }

  await db.contactdata.findOneAndUpdate({ _id : id }, { $set : params });

  return data = { status: 'success', message: 'Update Contact successful.' };

}


async function getblog() {

  const modules = await db.blog.find({ status: { $ne : 2 } });

  return modules;

}

async function getblogbyid(id) {

  const modules = await db.blog.findOne({ _id : id });
  const tag = await db.blogtag.find({ blog_id : id });

  return { 'blog': modules, 'tag': tag };

}

async function updateblogcategory(id, params) {

  const account = await db.blogcat.findOne({ _id : id, status: 1 });

  if ( params.txt_catname && account.txt_catname !== params.txt_catname && await db.blogcat.findOne( {txt_catname : params.txt_catname, status: { $ne : 2 } } )) {
    return data = { status: 'danger', message: 'Category "' + params.txt_catname + '" is already taken' };
  }

  const account1 = await db.blogcat.findOneAndUpdate({ _id : id }, { $set: params });

  return data = { status: 'success', message: 'Update Category successful.' };

}

async function updatebanner(id, params) {
 
  const account = await db.banner.findOneAndUpdate({ _id : id }, { $set: params});

  console.log(account);

  return data = { status: 'success', message: 'Update Banner successful.' };

}



 
async function updateuser(id, params) {

  const account = await db.account.findOne({ _id : id });
  // validate (if email was changed)
  if (params.email && account.email !== params.email && await db.account.findOne({ email : params.email, status: { $ne : 2 } })) {

    return data = { status: 'danger', message: 'Email "' + params.email + '" is already taken' };

  }

  // hash password if it was entered
  console.log(params.password);

  if (params.password) {
    params.password = await md5(params.password);
  }
  if (params.subscribtion == 'on') {
    params.subscribtion = '1';
  }
  else {
    params.subscribtion = '0';
  }
  if (params.isadmin == 'on') {
    params.isadmin = 'Y';
  }
  else {
    params.isadmin = 'N';
  }
  if (params.is_moderator == 'on') {
    params.is_moderator = 'Y';
  }
  else {
    params.is_moderator = 'N';
  }
  console.log(params);

  await db.account.findOneAndUpdate({ _id : id },{ $set : params });
  
  return data = { status: 'success', message: 'Update User successful.' };
}



async function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}



async function cms(params, origin) {

  const cms = await db.cms.findOne({ where: { page_slug: params.page } });
  if (cms) {
    return cms;

  }
  else {
    return { status: 'success', message: 'Data Not found.' };

  }
}
async function getallcms() {

  const cms = await db.cms.find();
  return cms;

}




async function addcontact(params, origin) {


  const product = new db.contactdata(params);
  await product.save();

  return data = { status: 'success', message: 'Add Contact successful.' };

}




async function addfaq(params, origin) {

  const product = new db.faq(params);
  product.product_id = 0;
  await product.save();

  return data = { status: 'success', message: 'Add Faq successful.' };

}

async function addcms(params, origin) {

  var getquestionIdinco = await db.cms.find({ status : { $ne : 2 }, $or : [ {page_name : params.page_name}, {page_slug : params.page_slug} ] });

  console.log(getquestionIdinco);

  if (getquestionIdinco.length > 0) {
    return data = { status: 'error', message: 'CMS already exist.Please try again.' };
  }

  const product = new db.cms(params);
  product.status = 1;
  product.cr_date = Date.now();

  await product.save();

  return data = { status: 'success', message: 'Add Cms successful.' };

}





async function updateblogadmin(id, params) {

  const blog = await db.blog.findOneAndUpdate({ _id : id }, { $set : params });

  if (params.tags) {

    var rows = await db.blogtag.deleteMany({ blog_id : id });
    
    for (const tags of params.tags) {

      const tag = await db.blogtag.findOne({ blog_id: id, tags: tags });

      const tagdata = { 'blog_id': blog.id, 'tags': tags };
      const tagda = new db.blogtag(tagdata);
      await tagda.save();

    }
  }
  return data = { status: 'success', message: 'Update Blog successful.' };


}
async function addblogadmin(params, origin) {
  console.log('4545',params)
  const blog = new db.blog(params);
  blog.status = 1;
  await blog.save();

  console.log(blog._id);

  if (params.tags) {
    for (const tags of params.tags) {
      console.log('tags', tags)
      const tagdata = { 'blog_id': blog._id, 'tags': tags };
      const tagda = new db.blogtag(tagdata);

      await tagda.save();
    }
  }

  return data = { status: 'success', message: 'Add Blog successful.' };

}

async function addbanner(params, origin) {

  const account = new db.banner(params);
  account.cr_date = Date.now();
  account.status = 1;

  await account.save();
  console.log(account);
  return data = { status: 'success', message: 'Add Banner successful.' };

}

async function importuser(params, origin) {
  // validate

  for (const para of params) {

      const country = await db.country.findOne({ country1: para.country });

      // create account object
      const adddata = { fname: para.Firstname, password: '', lname: para.Lastname, username: para.Username, email: para.Email, country: country.id, is_moderator: 'N', isadmin: 'N', subscribtion: '0' };

      const account = new db.account(adddata);

      // first registered account is an admin
      // const isFirstAccount = (await db.Account.count()) === 0;
      //account.role = isFirstAccount ? Role.Admin : Role.User;
      account.verificationToken = randomTokenString();
      // hash password
      account.verify = 1;
      account.status = 1;
      // save account
      await account.save();

  }
  return data = { status: 'success', message: 'Add User successful.' };

}

async function addblogcategory(params, origin) {
  // validate
  if ( await db.blogcat.findOne({ txt_catname: params.txt_catname, status: { $ne : 2 } } ) ) {
    return data = { status: 'danger', message: 'this category already exists.' };
  }

  const account = new db.blogcat(params);
  account.status = 1;
  await account.save();
  return data = { status: 'success', message: 'Add Category successful.' };

}

async function register(params, origin,ipAddress) {
  // validate
  if (await db.admin.findOne({ email: params.email })) {
      // send already registered error in email to prevent account enumeration
     return data= {status: 'error', message:'An account with this email address already exists.'};
  }

  // create account object
  const account = new db.admin(params);
    account.status = 1;

  account.password = await md5(params.password);

  // save account
  await account.save();

  return data={status: 'success', message: 'Registration successful.' };

}

async function adduser(params, origin) {
  // validate
  console.log(params);
  if (await db.account.findOne({
      $or : [
        { email: params.email },
        { username: params.email }
      ], status : { $ne : 2 }
  })) {
    // send already registered error in email to prevent account enumeration
    return data = { status: 'danger', message: 'An account with this email address already exists.' };
  }

  if (params.subscribtion == 'on') {
    params.subscribtion = '1';
  }
  else {
    params.subscribtion = '0';
  }
  if (params.isadmin == 'on') {
    params.isadmin = 'Y';
  }
  else {
    params.isadmin = 'N';
  }
  if (params.is_moderator == 'on') {
    params.is_moderator = 'Y';
  }
  else {
    params.is_moderator = 'N';
  }
  // create account object
  const account = new db.account(params);

  // first registered account is an admin
  // const isFirstAccount = (await db.account.count()) === 0;
  //account.role = isFirstAccount ? Role.Admin : Role.User;
  account.verificationToken = randomTokenString();

  // hash password
  account.verify = 1;
  account.status = 1;
  account.password = await md5(params.password);

  // save account
  await account.save();

  return data = { status: 'success', message: 'Add User successful.' };

}


async function getuserid(id) {
  const account = await db.account.findOne({ uniqueID: id });
  return { 'status': 'success', 'userid': account.id };
}


async function getbannerbyid(id) {
  const account = await db.banner.findOne({ _id: id });
  return account;
}

async function getalladmin() {
  const account = await db.account.find({ isadmin: 'Y', status: 1 });
  return account;
}




async function deleteuser(id) {

  const account = await db.account.findOneAndUpdate({ _id : id }, { $set: { status : 2 }});

}

async function deletecontact(id) {
  const account = await db.contactdata.findOneAndDelete({ _id: id });
}

async function deletefaq(id) {
  const account = await db.faq.findOneAndDelete({ _id: id });
}

async function deleteblogcategory(id) {
  const account = await db.blogcat.findOneAndUpdate({ _id : id }, { $set: { status : 2 }});
}


async function deletebanner(id) {
  const banner = await db.banner.findOneAndDelete({ _id: id });
}


async function updateadmindata(id, params) {
  var result_success = await db.admin.find({ username : params.username, _id : id, status : { $ne : 2 } });

  console.log(result_success);
  if (result_success) {

  var result_success1 = await db.admin.findOneAndUpdate({ _id : id }, { $set : params });
    return { 'status': 'success', 'message': 'Update successful.' }
  }
  else {
    return { 'status': 'success', 'message': 'Update Failed.' }
  }
}

async function deletemultiuser(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {

    const account = await db.account.findOneAndUpdate({ _id : id }, { $set: { status : 2 }});
      
  }
}

async function deletemultibanner(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    const deletemultibanner = await db.banner.findOneAndDelete({ _id : id });
  }
}

async function approvemultiuser(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    const account = await db.account.findOneAndUpdate({ _id : id }, { $set: { status : 1 }});
  }
}

async function inactivemultibanner(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    const banner = await db.banner.findOneAndUpdate({ _id: id }, {$set : { status : 0 }});
  }
}

async function activemultibanner(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {
    const banner = await db.banner.findOneAndUpdate({ _id: id }, {$set : { status : 1 }});
  }


}

async function statuschangecms(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  var status = params.status;
  for (const id of ids) {
    
    if (status == 1) {
      updStatus = 1;
    }
    if (status == 2) {
      updStatus = 0;
    }
    const account = await db.cms.findOneAndUpdate({ _id: id }, { $set : { status : updStatus } });

  }
}

async function statuschangeblogcat(params, origin) {
  //var ids=params.id;
  var ids = params.id.replace(/ /g, "").split(",");

  var status = params.status;
  //var ids=string.split(",");
  for (const id of ids) {
    if (status == 1) {
      var changeStatus = 1;
    }
    else if (status == 2) {
      changeStatus = 0;
    }
    else if (status == 3) {
      changeStatus = 2;
    }

    const account = await db.blogcat.findOneAndUpdate({ _id : id }, { $set: { status : changeStatus }});

  }

}

async function getadmindata(id) {
  var result_success = await db.admin.find({ _id : id });
  return result_success;
}

async function statuschangeblog(params, origin) {

  var ids = params.id.replace(/ /g, "").split(",");
  var status = params.status;

  for (const id of ids) {
    if (status == 1) {
      await db.blog.findOneAndUpdate({ _id : id }, { $set: { status : 1 }});
    }
    else if (status == 2) {
      await db.blog.findOneAndUpdate({ _id : id }, { $set: { status : 0 }});
    }
    else if (status == 7) {
      await db.blog.findOneAndUpdate({ _id : id }, { $set: { status : 2 }});
    }
    else if (status == 3) {
      await db.blog.findOneAndUpdate({ _id : id }, { $set: { editor_pick : 1 }});
    }
    else if (status == 4) {
      await db.blog.findOneAndUpdate({ _id : id }, { $set: { editor_pick : 0 }});
    }
    else if (status == 5) {
      await db.blog.findOneAndUpdate({ _id : id }, { $set: { featured_post : 1 }});
    }
    else if (status == 6) {
      await db.blog.findOneAndUpdate({ _id : id }, { $set: { featured_post : 0 }}
    );
  }
  }
}

async function rejectmultiuser(params, origin) {
  var ids = params.id.replace(/ /g, "").split(",");
  //var ids=string.split(",");
  for (const id of ids) {

    const account = await db.account.findOneAndUpdate({ _id : id }, { $set: { status : 0 }});

  }

}

async function getAccount(id) {

  const account = await db.account.findOne({ _id : id });
  if (!account) throw { status: 'error', message: 'Account not found' };
  return account;
}

async function getuser(id) {

  const account = await db.account.findOne({ _id : id });
  if (!account) throw { status: 'error', message: 'Account not found' };
  return account;
}

async function blogdelete(id) {

  const account = await db.blog.findOneAndUpdate({ _id : id }, { $set: { status : 2 }});

}

async function deletesubcat(id) {
  var idArray = id.split(",");
  for (const catId of idArray) {
    var qry = "DELETE FROM tbl_subcategory WHERE id = " + catId + "";
    const [rows, fields] = await db.connection.execute(qry);
  }
  return 1;
}

async function getAllusers() {
  const accounts = await db.account.find({ status : { $ne : 2 } });

  const userdata = [];
  for (const user of accounts) {

    const countryname = await db.country.findById(user.country);
    if (!countryname) {
      user.country = user.country;
    }
    else {
      user.country = countryname.country1;
    }
  }
  return accounts;
}

async function getAllusersfront() {

  const accounts = await db.account.find({ status: 1 }, null , { $sort : { cr_date : -1 } });

  return accounts;

}

async function contactdata() {

  const contactdata = await db.contactdata.find({});
  return contactdata;

}

async function getallcontactadmin() {

  const contactdata = await db.contactdata.find({});
  console.log(contactdata);
  return contactdata;

}

async function getAllcountry() {
  const country = await db.Country.find({ status: 1 });
  return country;
}

async function getAllcountryadmin() {
  const country = await db.Country.find({ status: { $ne : 2 } });
  return country;
}

async function blogcategory() {
  var blog = await db.blogcat.find({ status : { $ne : 2 }});
  return blog;
}

async function blogcategorybyid(id) {
  var blog = await db.blogcat.findOne({ _id : id, status : { $ne : 2 } });
  return blog;

}

async function getallbanner() {
  const banner = await db.banner.find({ status: 1 }, null, { $sort : { _id : -1 }});

  if (!banner) throw { status: 'error', message: 'Banner not found' };
  return banner;
}

async function getallbanneradmin() {

  const banner = await db.banner.find({ status: { $ne: 2 } } , '_id banner_image banner_caption status reference', {sort: {_id: -1}} );
  if (!banner) throw { status: 'error', message: 'Banner not found' };
  console.log(banner);
  return banner;

}

async function faq() {
  const faq = await db.faq.find({ product_id: 0 });
  return faq;
}

async function hash(password) {
  return await md5(password, 10);
}

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 1 day
  return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '1d' });
}

function randomTokenString() {

  return crypto.randomBytes(40).toString('hex');
}
