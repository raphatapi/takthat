var mongo = require("mongoose");  
var db =   
mongo.connect("mongodb://192.168.1.71:27017/reactcrud", function(err, response){  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
  
module.exports =db;  