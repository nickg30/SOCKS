var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// SIGN UP SCHEMA
var UserSchema = new Schema({
    // priviledges: Number,
    username: String,
    password: String,
    name: String,
    age: String,
    city: String,
    state: String,
    email: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
