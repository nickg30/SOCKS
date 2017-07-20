var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var mongoose = require('mongoose');
var textPost = require('../models/post');

// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for textpost action
router.get('/textpost', auth.textpost);

// route for logout action
router.get('/logout', auth.logout);
// route for text post action
router.post('/textPost', (req,res) => {
  var Schema = mongoose.Schema;
  var textPost = mongoose.model('textPost', textPostSchema);  
  console.log(req.body);
  var textPostSchema = new Schema({
  author: String,
  title: String,
  text: String,
  date: String,
  eventDate: String
});
  
  var newTextPost = new textPost({
    author: req.body.author,
    title: req.body.title,
    text: req.body.textPost,
    date: req.body.date,
    eventDate: req.body.eventDate
  });
  newTextPost.save(function(err) {
    if(err) throw err;

    console.log("post created!");
  })
  res.redirect(req.get('referer'));
})
// Not used ?????
// 
module.exports = router;
