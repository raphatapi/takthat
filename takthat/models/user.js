const mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
const passport = require('../config/passport');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  familyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  date: { type: Date, default: Date.now, required: true }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

userSchema.methods.updateUser = function(request, response){

	this.user.name = request.body.name;
	this.user.address = request.body.address;
	 this.user.save();
	response.redirect('/user');
};

const User = module.exports = mongoose.model("User", userSchema);
