// ------ DEPENDENCIES ------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// --------------------------------------------------
// - PHOTO UPLOADER DEPENDENCIES AND STORAGE METHOD -
// if/else mkdir check for propic
var multer = require('multer');
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // WHERE IMAGE GOES
        callback(null, "./public/Images");
        console.log(file);
    },
    filename: function (req, file, callback) {
        // NAME IMAGE FILE HERE
        // WILL CHECK FOR USERNAME.JPG
        // MAKE CASE STATEMENT FOR PNG, JPEG
        // callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        callback(null, req.user.username + ".jpg");
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

// --------------------------------------------------
// ADD YOUR MLAB USERNAME AND PASSWORD BELOW
// ------ MONGOOSE DATABASE CONNECTION --------------
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<USERNAME>:<PASSWORD>@ds125481.mlab.com:25481/bloodline')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
//--------------------------------------------------
// ------ ROUTES -----------------------------------
var index = require('./routes/index');
var users = require('./routes/users');
//--------------------------------------------------
// ------ *** LAUNCH APP *** -----------------------
var app = express();
// -------------------------------------------------
// ---- view engine setup --------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// -------------------------------------------------
// ----------- FAVICON -----------------------------
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// -------------------------------------------------
// ----- MIDDLEWARE --------------------------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// ---------------------------------------------------
// ---------------------------------------------------
// ----- passport configuration ----------------------
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// -------- REQ/RES/API ------------------------------
// NEW *****
app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        console.log("successful upload!");
        res.redirect('back');
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
