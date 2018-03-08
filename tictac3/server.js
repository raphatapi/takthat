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
  date: { type: Date, default: Date.now, required: true },
  },
  { versionKey: false });
   
  
var model = mongoose.model('user', userSchema, 'user');  
  
//api for get data from database  
app.get("/api/getdata",function(req,res){   
 model.find({},function(err,data){  
            if(err){  
                res.send(err);
                console.log(1);  
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
                console.log(2);  
            }  
            else{    
                   res.send({data:"Record has been Deleted..!!"});             
               }  
        });  
})  
  
  
//api for Update data from database  
app.post("/api/Updatedata",function(req,res){   
 	model.findByIdAndUpdate(req.body.id, { 
	 	familyName:  req.body.familyname, 
	 	firstName: req.body.firstname,
	 	lastName: req.body.lastname,
	 	email: req.body.email, 
	 	phone: req.body.phone,
    password: req.body.password
	 },

function(err) {  
	if (err) {  
 		res.send(err);
    console.log( 3);  
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
                console.log( 4);                
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
    console.log("server start on port" + port);  
}) 
