var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
const config = require('../config.json');
const urlapi = config.url;
const imagepath = config.imagepath;
const base = config.base;
const front = config.front;
const axios = require('axios');
const fs = require("fs");
const multer = require('multer');
const csv = require('csv-parser');
const upload = multer({ dest: 'uploads/' });
const csvtojson = require('csvtojson');
const { json } = require('body-parser');

module.exports = function (app) {

  function isUserAllowed(req, res, next) {
    sess = req.session;
    if (sess.user) {
      return next();
    }
    else { res.redirect(base + '/login'); }
  }

  app.get(base, isUserAllowed, function (req, res) {

    res.locals = { title: 'Dashboard', urlapi: urlapi, base: base, front: front };
    res.render('Dashboard/index');
  });

  app.get(base + '/adduser', isUserAllowed, function (req, res) {

    res.locals = { title: 'Add User', urlapi: urlapi, base: base };
    res.render('Users/adduser');

  });

  app.get(base + '/updateuser', isUserAllowed, function (req, res) {
    var id = req.query.id;
    axios({
      method: 'get',
      url: urlapi + 'getuser/' + id,
    })
      .then(function (response) {
        var responsedata = response.data;
        res.locals = { title: 'Update User', base: base, users: responsedata, id: id, imagepath: imagepath, urlapi: urlapi };
        res.render('Users/updateuser');
      }).catch();
  });

  app.get(base + '/users', isUserAllowed, function (req, res) {

    res.locals = { title: 'User List', base: base, urlapi: urlapi, imagepath: imagepath };
    res.render('Users/index');
  });


  app.get(base + '/addbanner', isUserAllowed, function (req, res) {



    res.locals = { title: 'Add Banner', base: base, urlapi: urlapi };
    res.render('Banner/addbanner');

  });

  app.get(base + '/editcontact', isUserAllowed, function (req, res) {
    var id = req.query.id;

    axios({
      method: 'get',
      url: urlapi + 'getcontactbyid/' + id,
    })
      .then(function (response) {
        var responsetest = response.data;
        res.locals = { title: 'Update Contact', base: base, id: id, responsetest: responsetest, urlapi: urlapi };
        res.render('Cms/editcontact');
      }).catch();
  });

  app.get(base + '/editcms', isUserAllowed, function (req, res) {
    var id = req.query.id;
    axios({
      method: 'get',
      url: urlapi + 'getcmsbyid/' + id,
    })
      .then(function (response) {
        var responsetest = JSON.parse(response.data);
        res.locals = { title: 'Cms', base: base, id: id, responsetest: responsetest, urlapi: urlapi };
        res.render('Cms/editcms');
      }).catch();

  });

  app.get(base + '/editfaq', isUserAllowed, function (req, res) {
    var id = req.query.id;
    axios({
      method: 'get',
      url: urlapi + 'getfaqbyid/' + id,
    })
      .then(function (response) {
        var responsetest = response.data;
        res.locals = { title: 'Update Faq', base: base, id: id, responsetest: responsetest, urlapi: urlapi };
        res.render('Cms/editfaq');
      }).catch();
  });

  app.get(base + '/addcontact', isUserAllowed, function (req, res) {
    res.locals = { title: 'Add Contact', base: base, urlapi: urlapi };
    res.render('Cms/addcontact');
  });

  app.get(base + '/addcms', isUserAllowed, function (req, res) {
    res.locals = { title: 'Cms', base: base, urlapi: urlapi };
    res.render('Cms/addcms');
  });

  app.get(base + '/addfaq', isUserAllowed, function (req, res) {
    res.locals = { title: 'Add Faq', base: base, urlapi: urlapi };
    res.render('Cms/addfaq');
  });

  app.get(base + '/updatebanner', isUserAllowed, function (req, res) {
    var id = req.query.id;
    axios({
      method: 'get',
      url: urlapi + 'getbannerbyid/' + id,
    })
      .then(function (response) {
        var responsedata = response.data;
        res.locals = { title: 'Update Banner', base: base, banner: responsedata, id: id, imagepath: imagepath, urlapi: urlapi };
        res.render('Banner/editbanner');
      }).catch();
  });

  app.get(base + '/contact', isUserAllowed, function (req, res) {
    axios({
      method: 'get',
      url: urlapi + 'getallcontactadmin',
    })
      .then(function (response) {
        var responsedata = response.data;
        res.locals = { title: 'Contact', base: base, contact: responsedata, urlapi: urlapi };
        res.render('Cms/contact');
      }).catch();

  });

  app.get(base + '/faq', isUserAllowed, function (req, res) {
    axios({
      method: 'get',
      url: urlapi + 'faq',
    })
      .then(function (response) {
        var responsedata = response.data;
        res.locals = { title: 'Faq', base: base, faq: responsedata, urlapi: urlapi };
        res.render('Cms/faq');
      }).catch();
  });

  app.get(base + '/cms', isUserAllowed, function (req, res) {
    res.locals = { title: 'CMS List', base: base, urlapi: urlapi };
    res.render('Cms/cms');
  });


  app.get(base + '/banner', isUserAllowed, function (req, res) {
    res.locals = { title: 'Banner', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('Banner/index');

  });

  app.get(base + '/blog', isUserAllowed, function (req, res) {
    res.locals = { title: 'Blog', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('blog/index');
  });

  app.get(base + '/addblog', isUserAllowed, function (req, res) {

    axios({
      method: 'get',
      url: urlapi + 'blogcategory',
    })
      .then(function (responsed) {

        axios({
          method: 'get',
          url: urlapi + 'getAllusersfront',
        })
          .then(function (responsedd) {
            var categorydata = responsed.data;
            var userdata = responsedd.data;
            res.locals = { title: 'Add Blog', base: base, categorydata: categorydata, userdata: userdata, urlapi: urlapi };
            res.render('blog/addblog');
          }).catch();

      }).catch();

  });

  app.get(base + '/editblog', isUserAllowed, function (req, res) {

    var id = req.query.id;

    axios({
      method: 'get',
      url: urlapi + 'getblogbyid/' + id,
    })
      .then(function (responsed) {

        axios({
          method: 'get',
          url: urlapi + 'blogcategory',
        })
          .then(function (responsedd) {

            axios({
              method: 'get',
              url: urlapi + 'getAllusersfront',
            })
              .then(function (responseuser) {

                var blog = responsed.data;
                var categorydata = responsedd.data;
                var userdata = responseuser.data;
                res.locals = { title: 'Edit Blog', base: base, blog: blog, id: id, categorydata: categorydata, userdata: userdata, imagepath: imagepath, urlapi: urlapi };
                res.render('blog/editblog');
              }).catch();
          }).catch();
      }).catch();

  });

  app.get(base + '/manageblogcategory', isUserAllowed, function (req, res) {
    res.locals = { title: 'Manage Blog Category', base: base, urlapi: urlapi };
    res.render('blog/manageblogcategory');
  });

  app.get(base + '/addblogcategory', isUserAllowed, function (req, res) {

    res.locals = { title: 'Add Blog Category', base: base, urlapi: urlapi };
    res.render('blog/addblogcategory');
  });

  app.get(base + '/editblogcategory', isUserAllowed, function (req, res) {

    var id = req.query.id;

    axios({
      method: 'get',
      url: urlapi + 'blogcategorybyid/' + id,
    })
      .then(function (response) {
        var catdata = response.data;
        res.locals = { title: 'Edit Blog Category', base: base, catdata: catdata, id: id, urlapi: urlapi };
        res.render('blog/updateblogcategory');
      }).catch();

  });

  app.get(base + '/changepassword', isUserAllowed, function (req, res) {

    res.locals = { title: 'Change Password', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('admin/changepassword');
  });


  app.get(base + '/administrator', isUserAllowed, function (req, res) {

    res.locals = { title: 'Administrator List', base: base, imagepath: imagepath, urlapi: urlapi };
    res.render('admin/administrator');
  });


  app.get(base + '/editadministrator', isUserAllowed, function (req, res) {
    id = req.query.id;

    axios({
      method: 'get',
      url: urlapi + 'getadmindata/' + id,
    })
      .then(function (response) {
        var admindata = response.data;
        res.locals = { title: 'Administrator Information', base: base, imagepath: imagepath, urlapi: urlapi, admin: admindata };
        res.render('admin/editadministrator');
      }).catch();
  });

}