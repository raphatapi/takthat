var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');

var flash    = require('connect-flash');
var path 	 = require('path'),
	fs 		 = require('fs');
var http 	 = require('http');
var server 	 = http.createServer(app);
var bodyParser = require ('body-parser');
var session = require ('express-session');
var cookieParser = require('cookie-parser');


var configDB = require('./config/database.js');

mongoose.connect(configDB.url); 

require('./config/passport')(passport); 





app.use(express.static(path.join(__dirname, '/client/public')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
// app.use(express.bodyParser({uploadDir:'/images'}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'maximus', resave: true, saveUninitialized: true }));





var routes = require('./models/routes.js')(app, passport,server); 

server.listen(port);
console.log('Listening  to  port ' + port);


