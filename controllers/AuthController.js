var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var textPost = require("../models/post");
var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  textPost.find({}, function(err,textPost) {
    if(err) throw err;

    console.log(textPost);
  res.render('index', { user : req.user, title: 'TextCapsule', post: textPost });
  });
};
// Go to textpost page
userController.textpost =  function(req, res) {
  res.render('textpost', { user: req.user });
}

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ 
    username : req.body.username,
    name: req.body.name, 
    age: req.body.age, 
    city: req.body.city, 
    state: req.body.state, 
    email: req.body.email}), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
