
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const config = require('./config/config');
var cors = require('cors');
const app = express();
var url = '';

//Get system IP and then connect to db
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  mongoose.connect(`mongodb://localhost/react-bulletin`, { useMongoClient: true }, (err, db) =>{
    if(err){
      console.log('Error Opening DB');
    }else{
      console.log(`Mongo DB started at port ${config.dbPort}`);
      app.listen(config.serverPort, function(){
        console.log(`Server started at port ${config.serverPort}`);
      });
    }
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/config", express.static(__dirname + '/config'));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/board.html');
});
require('./db/models');
var api = require('./api/api');
app.use('/api', api);
