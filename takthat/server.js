// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const logger = require('morgan');
// const path = require('path');
// const routes = require("./routes");
// const app = express();

// const PORT = process.env.PORT || 3001;

// // Configure body parser for AJAX requests
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// // Serve up static assets
// app.use(express.static(path.join(__dirname, "client/build")));
// // Add routes, both API and view
// app.use(routes);

// // Set up promises with mongoose
// mongoose.Promise = global.Promise;
// // Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/takthat"
// );

// // Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });


var express = require("express");  
var path = require("path");  
var mongo = require("mongoose");   
var bodyParser = require('body-parser');   
var morgan = require("morgan");  
var db = require("./config.js");  
  
var app = express();  
var port = process.env.port || 7777;  
var srcpath  =path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
  
  
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
const userSchema = new Schema({
  familyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: {type: String, required: true},
  date: { type: Date, default: Date.now, required: true }
});
   
  
var model = mongoose.model('user', userSchema, 'user');  
  
//api for get data from database  
app.get("/api/getdata",function(req,res){   
 model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
        });  
})  
  
  
//api for Delete data from database  
app.post("/api/Removedata",function(req,res){   
 model.remove({ _id: req.body.id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                   res.send({data:"Record has been Deleted..!!"});             
               }  
        });  
})  
  
  
//api for Update data from database  
app.post("/api/Updatedata",function(req,res){   
 	model.findByIdAndUpdate(req.body.id, { 
	 	familyName:  req.body.familyName, 
	 	firstName: req.body.firstName,
	 	lastName: req.body.lastName,
	 	email: req.body.email, 
	 	phone: req.body.phone
	 },

function(err) {  
	if (err) {  
 		res.send(err);  
 	return;  
 	}  
	res.send({data:"Record has been Updated..!!"});  
 	});  
})    
  
  
//api for Insert data from database  
app.post("/api/savedata",function(req,res){   
       
    var mod = new model(req.body);  
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Record has been Inserted..!!"});  
            }  
        });  
})  
      
// call by default index.html page  
app.get("*",function(req,res){   
    res.sendFile(srcpath +'/index.html');  
})  
  
//server stat on given port  
app.listen(port,function(){   
    console.log("server start on port"+ port);  
}) 
