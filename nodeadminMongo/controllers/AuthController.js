const config = require('../config.json');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var base = config.base;
var urlapi = config.url;
var axios = require("axios");

// Export Auth routes
module.exports = function (app, appExpress) {

	app.get('/login', function (req, res) {

		var data = { "firstname": "node", "lastname": "admin", "email": "nodeadmin@vginfotec.com", "username": "nodeadmin", "password": "Nodeadmin123", "status": "1" };

		axios({
			method: 'post',
			url: urlapi + '/register',
			data: data
		})
			.then(function (response) {
				res.render('Auth/auth-login', { 'message': req.flash('message'), 'error': req.flash('error') });
			}).catch();
	});

	app.post('/post-login', urlencodeParser, function (req, res) {

		if (req.body.captch === req.body.captchtext) {
			var data = {
				username: req.body.email,
				password: req.body.password
			};

			axios({
				method: 'post',
				url: urlapi + '/addlogin',
				data: data
			})
				.then(function (response) {
					var data = response.data;
					console.log('data', data)
					if (data.status == 'success') {
						let users = [
							{ id: 1, username: data.datam.username, password: data.datam.password, email: data.datam.email }
						];
						req.body.email = data.datam.email;
						req.body.email = data.datam.password
						const validUser = data.datam;
					}

					if (data.status == 'success') {

						// Assign value in session
						sess = req.session;
						sess.user = data.datam;

						res.redirect(base + '/');


					} else {
						req.flash('error', 'Incorrect email or password!');
						res.redirect(base + '/login');
					}
				}).catch();
		}
		else {
			req.flash('error', 'Enter correct Captcha!');
			res.redirect(base + '/login');
		}
	});

	app.get('/logout', function (req, res) {

		// Assign  null value in session
		sess = req.session;
		sess.user = null;

		res.redirect(base + '/login');
	});

	appExpress.use(base, app);

};