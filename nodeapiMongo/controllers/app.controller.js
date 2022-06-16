const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const appService = require('./app.service');
const fs = require('fs');
const { imagepath } = require('../config.json');
const sharp = require('sharp');


// routes authenticate 
//frontapi
router.get('/totalcount', totalcount);
router.post('/addpagedata',addpagedata);
router.post('/getpassword',getpassword);
router.get('/usermanagement', usermanagement);
router.put('/updateadmindata/:id', updateadmindata);
router.get('/getadmindata/:id', getadmindata);
router.post('/deletedatauserpage', deletedatauserpage);
router.get('/getblog', getblog);
router.post('/addlogin', addlogin);
router.post('/changepasswordadmin', changepasswordadmin);
router.get('/getblogbyid/:id', getblogbyid);
router.post('/register', register);
router.get('/getAllcityadmin', getAllcityadmin);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/validate-reset-token', validateResetTokenSchema, validateResetToken);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.get('/getallcontactadmin', getallcontactadmin);
router.put('/blogdelete/:id',  blogdelete);
router.post('/addbanner', addbanner);
router.get('/getallbanner',  getallbanner);
router.get('/getallbanneradmin',  getallbanneradmin);
router.post('/getallblog',  getallblog);
router.post('/statuschangecms',  statuschangecms);
router.get('/getuserid/:id',  getuserid);
router.get('/getbannerbyid/:id',  getbannerbyid);
router.post('/addblogadmin',  addblogadmin);
router.get('/getAllcountry',  getAllcountry);
router.get('/getAllcountryadmin',  getAllcountryadmin);
router.get('/getAllstateadmin',  getAllstateadmin);
router.get('/contactdata',  contactdata);
router.get('/getalladmin',  getalladmin);
router.get('/getAllusers',  getAllusers);
router.get('/getAllusersfront',  getAllusersfront);
router.get('/getuser/:id',  getuser);
router.post('/adduser', adduser);
router.post('/importuser', importuser);
router.put('/updateuser/:id',  updateuser);
router.put('/updateblogadmin/:id',  updateblogadmin);
router.put('/updatebanner/:id',  updatebanner);
router.put('/editcontact/:id',  updatecontact);
router.get('/getcontactbyid/:id',  getcontactbyid);
router.delete('/deleteuser/:id',  deleteuser);
router.delete('/deletecontact/:id',  deletecontact);
router.delete('/deletefaq/:id',  deletefaq);
router.delete('/deleteblogcategory/:id',  deleteblogcategory);
router.delete('/deletebanner/:id',  deletebanner);
router.post('/deletemultiuser',  deletemultiuser);
router.post('/deletemultibanner',  deletemultibanner);
router.post('/approvemultiuser',  approvemultiuser);
router.post('/rejectmultiuser',  rejectmultiuser);
router.post('/statuschangeblog',  statuschangeblog);
router.post('/statuschangeblogcat',  statuschangeblogcat);
router.post('/inactivemultibanner',  inactivemultibanner);
router.post('/activemultibanner',  activemultibanner);
router.get('/blogcategory', blogcategory);
router.get('/blogcategoryfront', blogcategoryfront);
router.get('/blogcategorybyid/:id', blogcategorybyid);
router.post('/cms',cms);
router.get('/faq',faq);
router.get('/getallcms',getallcms);
router.get('/getfaqbyid/:id',getfaqbyid);
router.post('/addfaq',addfaq);
router.put('/updatefaq/:id',updatefaq);
router.post('/addcms',addcms);
router.put('/updatecms/:id',updatecms);
router.get('/getcmsbyid/:id',getcmsbyid);
router.get('/getuserdetails/:id', getuser);
router.post('/addblogcategory', addblogcategory);
router.post('/contactsend', contactsend);
router.post('/addcontact', addcontact);
router.put('/updateblogcategory/:id',  updateblogcategory);

module.exports = router;

function refreshToken(req, res, next) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    appService.refreshToken({ token, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken);
            res.json(account);
        })
        .catch(next);
}


//contact send
function contactsend(req, res, next) {
    appService.contactsend(req.body, req.get('origin'))
    .then(() => res.json({ status: 'success',message: 'Contact Send successfully' }))
    .catch(next);
} 
//contact send

function register(req, res, next) {
    const ipAddress = req.ip;
    appService.register(req.body, req.get('origin'),ipAddress)
    .then(data => res.json(data))
    .catch(next);
} 
function blogcategory(req, res, next) {
    appService.blogcategory()
        .then(cat => res.json(cat))
        .catch(next);
}
//get blogcategory for front
function blogcategoryfront(req, res, next) {
    appService.blogcategoryfront()
        .then(cat => res.json(cat))
        .catch(next);
}

function blogcategorybyid(req, res, next) {
    appService.blogcategorybyid(req.params.id)
        .then(cat => res.json(cat))
        .catch(next);
}

//add faq

function faq(req, res, next) {
    appService.faq()
        .then(faq => res.json(faq))
        .catch(next);
}

function getallcms(req, res, next) {
    appService.getallcms()
        .then(data => res.json(data))
        .catch(next);
}
//get all cms

function statuschangesubcat(req, res, next) {
    appService.statuschangesubcat(req.body, req.get('origin'))
    .then(() => res.json({ status: 'success',message: 'Status Update successfully' }))
    .catch(next);
} 

/*get cms */
function cms(req, res, next) {
    appService.cms(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 


function contactdata(req, res, next) {
    appService.contactdata()
        .then(contact => res.json(contact))
        .catch(next);
}
function getallcontactadmin(req, res, next) {
    appService.getallcontactadmin()
        .then(contact => res.json(contact))
        .catch(next);
}
//get all country

function getAllcountry(req, res, next) {
    appService.getAllcountry()
        .then(country => res.json(country))
        .catch(next);
}
function getAllcountryadmin(req, res, next) {
    appService.getAllcountryadmin()
        .then(country => res.json(country))
        .catch(next);
}
function getAllstateadmin(req, res, next) {
    appService.getAllstateadmin()
        .then(state => res.json(state))
        .catch(next);
}

function getAllcityadmin(req, res, next) {
    appService.getAllcityadmin()
        .then(city => res.json(city))
        .catch(next);
}




function getallbanner(req, res, next) {
    appService.getallbanner()
        .then(data => res.json(data))
        .catch(next);
}

function getallbanneradmin(req, res, next) {
    appService.getallbanneradmin()
        .then(banner => res.json(banner))
        .catch(next);
}
//get all banner
//get all blog
function getallblog(req, res, next) {
    appService.getallblog(req.body, req.get('origin'))
        .then(blog => res.json(blog))
        .catch(next);
}
//get all blog


//get category by id
function getallcategorybyid(req, res, next) {
  
    appService.getallcategorybyid(req.params.id)
        .then(country => res.json(country))
        .catch(next);     
}
//get category by id
//get category by id
function getuserid(req, res, next) {
  
    appService.getuserid(req.params.id)
        .then(country => res.json(country))
        .catch(next);     
}
function getcontactbyid(req, res, next) {
  
    appService.getcontactbyid(req.params.id)
        .then(country => res.json(country))
        .catch(next);     
}
function getfaqbyid(req, res, next) {
  
    appService.getfaqbyid(req.params.id)
        .then(data => res.json(data))
        .catch(next);     
}
function getcmsbyid(req, res, next) {
  
    appService.getcmsbyid(req.params.id)
        .then(data => res.json(data))
        .catch(next);     
}
//get category by id

//get banner by id
function getbannerbyid(req, res, next) {
  
    appService.getbannerbyid(req.params.id)
        .then(country => res.json(country))
        .catch(next);     
}


//get usersetting by id
function getalladmin(req, res, next) {
  
    appService.getalladmin()
        .then(admin => res.json(admin))
        .catch(next);     
}


//get country by id
//get user by id
function getuser(req, res, next) {
  
    appService.getuser(req.params.id)
        .then(user => res.json(user))
        .catch(next);     
}

//add user
function adduserdataSchema(req, res, next) {
    const schema = Joi.object({
        fname: Joi.string(),
        lname: Joi.string(),
        username: Joi.string(),
        image_name: Joi.string().empty(''),
        email: Joi.string().email().required(),
        country: Joi.string(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });
    validateRequest(req, next, schema);
}

function addcategorydataSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        meta_title: Joi.string(),
        meta_keyword: Joi.string(),
        meta_description: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function importuser(req, res, next) {
    

    appService.importuser(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
//add poll


//add blog category
function addblogcategory(req, res, next) {
    
    appService.addblogcategory(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
function addsubcategory(req, res, next) {
    
    appService.addsubcategory(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 

//add contact
function addcontact(req, res, next) {
    
    appService.addcontact(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
//add contact



function addpagedata(req, res, next) {
   
    appService.addpagedata(req.body, req.get('origin'))
    .then(() => res.json({ status: 'success',message: 'add pagedata successfully' }))
    .catch(next);
} 

function addfaq(req, res, next) {
    
    appService.addfaq(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
//add faq
//add cms
function addcms(req, res, next) {
    
    appService.addcms(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
//add faq

function blogdelete(req, res, next) {
    
    appService.blogdelete(req.params.id)
    .then(() => res.json({ status: 'success',message: 'Deleted Data successfully' }))
    .catch(next);
}

function updateblogcategory(req, res, next) {
    
    appService.updateblogcategory(req.params.id,req.body)
    .then(data => res.json(data))
    .catch(next);
} 


function updatesubcategory(req, res, next) {
    
    appService.updatesubcategory(req.params.id,req.body)
    .then(data => res.json(data))
    .catch(next);
} 





//add user
function adduser(req, res, next) {
    
    
     if(req.body.image_name)
      {
    var matches = req.body.image_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    responsepro = {};
    if(matches)
    {
    responsepro.type = matches[1];
    responsepro.data = new Buffer(matches[2], 'base64');
            let decodedImgpro = responsepro;
            let imageBuffer = decodedImgpro.data;
            let type = decodedImgpro.type;
            let ts = Date.now();
            var string = type.split("/");
            let extension = string[1];
            let fileName = "image_"+ts+"." + extension;
           fs.mkdir(imagepath+"user", function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
            try {
            fs.writeFileSync(imagepath+"user/" + fileName, imageBuffer, 'utf8');

            /*desize profile image*/
       sharp(imagepath+'user/'+fileName).resize(24, 24).toFile(imagepath+'user/thumb/' + fileName, (err, resizeImage) => {
       });
           /*desize profile image*/
            req.body.image=fileName;
            } catch (e) {
            next(e);
            } 
        }
        
        }
    appService.adduser(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
//add discount

//add banner
function addbanner(req, res, next) {
	if(req.body.countryId)
	{
		req.body.countryId=req.body.countryId.join(',');
	}
     
     if(req.body.banner_image)
      {
    var matches = req.body.banner_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    responsepro = {};
    if(matches)
    {
    responsepro.type = matches[1];
    responsepro.data = new Buffer(matches[2], 'base64');
            let decodedImgpro = responsepro;
            console.log(decodedImgpro);
            let imageBuffer = decodedImgpro.data;
             console.log(imageBuffer);
            let type = decodedImgpro.type;
            let ts = Date.now();
            var string = type.split("/");
            let extension = string[1];
            let fileName = "image_"+ts+"." + extension;
           fs.mkdir(imagepath+"banner", function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
            try {
            fs.writeFileSync(imagepath+"banner/" + fileName, imageBuffer, 'utf8');

            /*desize blog image*/
        sharp(imagepath+'banner/'+fileName).resize(1920, 500).toFile(imagepath+'banner/' + fileName, (err, resizeImage) => {
       });
       
           /*desize blog image*/
            req.body.banner_image=fileName;
            } catch (e) {
            next(e);
            } 
        }
        
        }
    appService.addbanner(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
//add banner


//recreate_training

function usermanagement(req, res, next) {
    appService.usermanagement()
    .then(data => res.json(data))
    .catch(next);
} 
//bbb
//add training

//totalcount
function totalcount(req, res, next) {
    appService.totalcount()
    .then(data => res.json(data))
    .catch(next);
} 
//totalcount


function deletedatauserpage(req, res, next)
{
  appService.deletedatauserpage(req.body, req.get('origin'))
    .then(() => res.json({ status: 'success',message: 'Deleted  Data successfully' }))
    .catch(next);  
}

function addblogadmin(req, res, next) {
    
     if(req.body.txt_mediatype == 1)
      {
     if(req.body.image_name)
      {
    var matches = req.body.image_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    responsepro = {};
    if(matches)
    {
    responsepro.type = matches[1];
    responsepro.data = new Buffer(matches[2], 'base64');
            let decodedImgpro = responsepro;
            console.log(decodedImgpro);
            let imageBuffer = decodedImgpro.data;
             console.log(imageBuffer);
            let type = decodedImgpro.type;
            let ts = Date.now();
            var string = type.split("/");
            let extension = string[1];
            let fileName = "image_"+ts+"." + extension;
            fs.mkdir(imagepath+"user", function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
            try {
            fs.writeFileSync(imagepath+"user/" + fileName, imageBuffer, 'utf8');
            req.body.txt_mediaurl=fileName;
            } catch (e) {
            next(e);
            } 
        }
        
        }

        if(req.body.thumbimage_name)
        {
      var matches = req.body.thumbimage_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      responsepro = {};
      if(matches)
      {
      responsepro.type = matches[1];
      responsepro.data = new Buffer(matches[2], 'base64');
              let decodedImgpro = responsepro;
              console.log(decodedImgpro);
              let imageBuffer = decodedImgpro.data;
               console.log(imageBuffer);
              let type = decodedImgpro.type;
              let ts = Date.now();
              var string = type.split("/");
              let extension = string[1];
              let fileName = "image_"+ts+"." + extension;
             fs.mkdir(imagepath+"user/thumb", function(err) {
                if (err) {
                  console.log(err)
                } else {
                  console.log("New directory successfully created.")
                }
              })

              try {
                fs.writeFileSync(imagepath+"user/thumb/" + fileName, imageBuffer, 'utf8');
             /*desize blog image*/
              req.body.thumbimage_name=fileName;
              } catch (e) {
              next(e);
              } 
          }
          
          }
    }
    else
    {
        if(req.body.image_name)
      {
     var matches = req.body.image_name.match(";");
      if(matches)
    {
     var string = req.body.image_name.split(";");

        var type=string[0].split("/");
            let ts = Date.now();
            //var string = type.split("/");
            let extension = type[1];
            let fileName = "image_"+ts+"." + extension;
            
        
    var dd = req.body.image_name.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
     //var dd = req.body.image_name.replace(/ /g, '+'); // <--- this is important
     fs.writeFile(imagepath+"user/" +fileName , dd, 'base64', function(err) {});
     req.body.txt_mediaurl=fileName;  
        }
        }

        if(req.body.thumbimage_name)
        {
      var matches = req.body.thumbimage_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      responsepro = {};
      if(matches)
      {
      responsepro.type = matches[1];
      responsepro.data = new Buffer(matches[2], 'base64');
              let decodedImgpro = responsepro;
              console.log(decodedImgpro);
              let imageBuffer = decodedImgpro.data;
               console.log(imageBuffer);
              let type = decodedImgpro.type;
              let ts = Date.now();
              var string = type.split("/");
              let extension = string[1];
              let fileName = "image_"+ts+"." + extension;
             fs.mkdir(imagepath+"user/thumb", function(err) {
                if (err) {
                  console.log(err)
                } else {
                  console.log("New directory successfully created.")
                }
              })

              try {
                fs.writeFileSync(imagepath+"user/thumb/" + fileName, imageBuffer, 'utf8');
             /*desize blog image*/
              req.body.thumbimage_name=fileName;
              } catch (e) {
              next(e);
              } 
          }
          
          }
    }
    appService.addblogadmin(req.body, req.get('origin'))
    .then(data => res.json(data))
    .catch(next);
} 
//add admin blog




function updateblogadmin(req, res, next) {
   var id= req.params.id;
     if(req.body.txt_mediatype == 1)
      {
     if(req.body.image_name)
      {
    var matches = req.body.image_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    responsepro = {};
    if(matches)
    {
    responsepro.type = matches[1];
    responsepro.data = new Buffer(matches[2], 'base64');
            let decodedImgpro = responsepro;
            console.log(decodedImgpro);
            let imageBuffer = decodedImgpro.data;
             console.log(imageBuffer);
            let type = decodedImgpro.type;
            let ts = Date.now();
            var string = type.split("/");
            let extension = string[1];
            let fileName = "image_"+ts+"." + extension;
           fs.mkdir(imagepath+"user/200", function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
           fs.mkdir(imagepath+"user/thumb", function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
            try {
            fs.writeFileSync(imagepath+"user/" + fileName, imageBuffer, 'utf8');
            req.body.txt_mediaurl=fileName;
            } catch (e) {
            next(e);
            } 
        }
        
        }

        if(req.body.thumbimage_name)
        {
      var matches = req.body.thumbimage_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      responsepro = {};
      if(matches)
      {
      responsepro.type = matches[1];
      responsepro.data = new Buffer(matches[2], 'base64');
              let decodedImgpro = responsepro;
              console.log(decodedImgpro);
              let imageBuffer = decodedImgpro.data;
               console.log(imageBuffer);
              let type = decodedImgpro.type;
              let ts = Date.now();
              var string = type.split("/");
              let extension = string[1];
              let fileName = "image_"+ts+"." + extension;
             fs.mkdir(imagepath+"user/thumb", function(err) {
                if (err) {
                  console.log(err)
                } else {
                  console.log("New directory successfully created.")
                }
              })

              try {
                fs.writeFileSync(imagepath+"user/thumb/" + fileName, imageBuffer, 'utf8');
             /*desize blog image*/
              req.body.thumbimage_name=fileName;
              } catch (e) {
              next(e);
              } 
          }
          
          }
    }
    else
    {
        if(req.body.image_name)
      {
     var matches = req.body.image_name.match(";");
      if(matches)
    {
     var string = req.body.image_name.split(";");

        var type=string[0].split("/");
            let ts = Date.now();
            //var string = type.split("/");
            let extension = type[1];
            let fileName = "image_"+ts+"." + extension;
            
        
    var dd = req.body.image_name.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
     //var dd = req.body.image_name.replace(/ /g, '+'); // <--- this is important
     fs.writeFile(imagepath+"user/" +fileName , dd, 'base64', function(err) {}); 
     req.body.txt_mediaurl=fileName; 
        }
        }

        if(req.body.thumbimage_name)
        {
      var matches = req.body.thumbimage_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      responsepro = {};
      if(matches)
      {
      responsepro.type = matches[1];
      responsepro.data = new Buffer(matches[2], 'base64');
              let decodedImgpro = responsepro;
              console.log(decodedImgpro);
              let imageBuffer = decodedImgpro.data;
               console.log(imageBuffer);
              let type = decodedImgpro.type;
              let ts = Date.now();
              var string = type.split("/");
              let extension = string[1];
              let fileName = "image_"+ts+"." + extension;
             fs.mkdir(imagepath+"user/thumb", function(err) {
                if (err) {
                  console.log(err)
                } else {
                  console.log("New directory successfully created.")
                }
              })

              try {
                fs.writeFileSync(imagepath+"user/thumb/" + fileName, imageBuffer, 'utf8');
             /*desize blog image*/
              req.body.thumbimage_name=fileName;
              } catch (e) {
              next(e);
              } 
          }
          
          }
    }
    appService.updateblogadmin(id,req.body)
    .then(data => res.json(data))
    .catch(next);
} 
//update user
function updateuserSchema(req, res, next) {
    const schema = Joi.object({
        fname: Joi.string(),
        lname: Joi.string(),
        username: Joi.string(),
        email: Joi.string().email().required(),
        country: Joi.string(),
        
    });
    validateRequest(req, next, schema);
}


function getpassword(req, res, next) { 
    
    appService.getpassword(req.body,req.get('origin'))
    .then(data => res.json(data))
        .catch(next);
}
function changepasswordadmin(req, res, next) { 
    
    appService.changepasswordadmin(req.body,req.get('origin'))
    .then(data => res.json(data))
        .catch(next);
}
function addlogin(req, res, next) { 
    
    appService.addlogin(req.body,req.get('origin'))
    .then(data => res.json(data))
        .catch(next);
}

function updateadmindata(req, res, next)
{
    appService.updateadmindata(req.params.id,req.body)
    .then(data => res.json(data))
        .catch(next);
}
function getadmindata(req, res, next)
{
    appService.getadmindata(req.params.id)
    .then(data => res.json(data))
        .catch(next);
}


//update user
function updateuser(req, res, next) { 
    if(req.body.image_name)
      {
    var matches = req.body.image_name.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    responsepro = {};
    if(matches)
    {
    responsepro.type = matches[1];
    responsepro.data = new Buffer(matches[2], 'base64');
            let decodedImgpro = responsepro;
            let imageBuffer = decodedImgpro.data;
            let type = decodedImgpro.type;
            let ts = Date.now();
            var string = type.split("/");
            let extension = string[1];
            let fileName = "image_"+ts+"." + extension;
           fs.mkdir(imagepath+"user", function(err) {
              if (err) {
                console.log(err)
              } else {
                console.log("New directory successfully created.")
              }
            })
            try {
            fs.writeFileSync(imagepath+"user/" + fileName, imageBuffer, 'utf8');

            /*desize profile image*/
            sharp(imagepath+'user/'+fileName).resize(24, 24).toFile(imagepath+'user/thumb/' + fileName, (err, resizeImage) => {
       });
           /*desize profile image*/
            req.body.image=fileName;

            } catch (e) {
            next(e);
            } 
        }
        
        }
    appService.updateuser(req.params.id,req.body)
    .then(data => res.json(data))
        .catch(next);
}

function updatecontact(req, res, next) { 
  
    appService.updatecontact(req.params.id,req.body)
    .then(data => res.json(data))
        .catch(next);
}
//update contact

//update faq
function updatefaq(req, res, next) { 
  
    appService.updatefaq(req.params.id,req.body)
    .then(data => res.json(data))
        .catch(next);
}
//update cms


function updatecms(req, res, next) { 
  
    appService.updatecms(req.params.id,req.body)
    .then(data => res.json(data))
        .catch(next);
}
//update freeresource

function updatebanner(req, res, next) { 
	if(req.body.countryId)
	{

       req.body.countryId=req.body.countryId.join(',');
	}
    if(req.body.banner_image)
      {
    var matches = req.body.banner_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    responsepro = {};
    if(matches)
    {
    responsepro.type = matches[1];
    responsepro.data = new Buffer(matches[2], 'base64');
            let decodedImgpro = responsepro;
            let imageBuffer = decodedImgpro.data;
            let type = decodedImgpro.type;
            let ts = Date.now();
            var string = type.split("/");
            let extension = string[1];
            let fileName = "image_"+ts+"." + extension;
           
            try {
            fs.writeFileSync(imagepath+"banner/" + fileName, imageBuffer, 'utf8');

            /*desize blog image*/
        sharp(imagepath+'banner/'+fileName).resize(1920, 500).toFile(imagepath+'banner/' + fileName, (err, resizeImage) => {
       });
       
            req.body.banner_image=fileName;

            } catch (e) {
            next(e);
            } 
        }
        
        }
    appService.updatebanner(req.params.id,req.body)
    .then(data => res.json(data))
        .catch(next);
}



function getblog(req, res, next) {
  
    appService.getblog()
        .then(menu => res.json(menu))
        .catch(next);     
}

function getblogbyid(req, res, next) {
  
    appService.getblogbyid(req.params.id)
        .then(menu => res.json(menu))
        .catch(next);     
}





//get all user
function getAllusers(req, res, next) {
    appService.getAllusers()
        .then(accounts => res.json(accounts))
        .catch(next);
}
function getallblogcomment(req, res, next) {
    appService.getallblogcomment()
        .then(accounts => res.json(accounts))
        .catch(next);
}

function getAllusersfront(req, res, next) {
    appService.getAllusersfront()
        .then(accounts => res.json(accounts))
        .catch(next);
}

//delete user
function deleteuser(req, res, next) {
    
    appService.deleteuser(req.params.id)
        .then(() => res.json({ status: 'success',message: 'Deleted  User successfully' }))
        .catch(next);
}

//delete user

//delete contact
function deletecontact(req, res, next) {
    
    appService.deletecontact(req.params.id)
        .then(() => res.json({ status: 'success',message: 'Deleted  Contact successfully' }))
        .catch(next);
}
//delete contact
//delete faq
function deletefaq(req, res, next) {
    
    appService.deletefaq(req.params.id)
        .then(() => res.json({ status: 'success',message: 'Deleted  Faq successfully' }))
        .catch(next);
}
//delete faq
//delete discount


//delete category

//delete blog category
function deleteblogcategory(req, res, next) {
    appService.deleteblogcategory(req.params.id)
        .then(() => res.json({ status: 'success',message: 'Deleted  Category successfully' }))
        .catch(next);
}
//delete blog category

//delete blog category
//delete banner
function deletebanner(req, res, next) {
    appService.deletebanner(req.params.id)
        .then(() => res.json({ status: 'success',message: 'Deleted  Banner successfully' }))
        .catch(next);
}
function deleteblog(req, res, next) {
    appService.deleteblog(req.params.id)
        .then(() => res.json({ status: 'success',message: 'Deleted  Blog successfully' }))
        .catch(next);
}
//delete banner



//delete notes
//delete multiuser
function deletemultiuser(req, res, next) {
    appService.deletemultiuser(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Deleted  User successfully' }))
        .catch(next);
}
//delete multiuser

//delete banner
function deletemultibanner(req, res, next) {
    appService.deletemultibanner(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Deleted  Banner successfully' }))
        .catch(next);
}
//delete banner

//inactive multi banner 
function inactivemultibanner(req, res, next) {
    appService.inactivemultibanner(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Inactive Category successfully' }))
        .catch(next);
}
//inactive multi banner 
//active multi banner 
function activemultibanner(req, res, next) {
    appService.activemultibanner(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Active Category successfully' }))
        .catch(next);
}
//active multi banner
//reject multi user 
function rejectmultiuser(req, res, next) {
    appService.rejectmultiuser(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Reject User successfully' }))
        .catch(next);
}
//reject multi user



function statuschangeblogcat(req, res, next) {
    appService.statuschangeblogcat(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Update Blog Category Status successfully' }))
        .catch(next);
}



function statuschangeblog(req, res, next) {
    appService.statuschangeblog(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Update Blog Status successfully' }))
        .catch(next);
}



function statuschangecms(req, res, next) {
    appService.statuschangecms(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Update  Cms Status successfully' }))
        .catch(next);
}
//statuschange multi product 
//approve multi user
function approvemultiuser(req, res, next) {
    appService.approvemultiuser(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Deleted  User successfully' }))
        .catch(next);
}
//approve multi user
function revokeTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function revokeToken(req, res, next) {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({ message: 'Token is required' });

    appService.revokeToken({ token, ipAddress })
        .then(() => res.json({status:'success', message: 'Token revoked' }))
        .catch(next);
}

function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
    
    appService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({status: 'success', message: 'Password Reset Email Sent Successfully..! In case if you do not find the email in Inbox then, please check your BULK or SPAM folders.Also mark the email as Not Junk to receive future emails to your Inbox.' }))
        .catch(next);
}

function validateResetTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function validateResetToken(req, res, next) {
    appService.validateResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next);
}

function resetPasswordSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function resetPassword(req, res, next) {
    appService.resetPassword(req.body)
        .then(() => res.json({ status: 'success',message: 'Password reset successful, you can now login' }))
        .catch(next);
}


function logout(req, res, next) {
    
    appService.logout(req.body, req.get('origin'))
        .then(() => res.json({ status: 'success',message: 'Logout Successfully' }))
        .catch(next);
}
/*get notification  By  Id */



// helper functions

function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 30 days
    const cookieOptions = {

        httpOnly: true,
        expires: new Date(Date.now() + 30*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
} 
