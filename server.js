const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const app = express();
const url = '';

//Get system IP and then connect to db
// require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//   mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/takthat', { useMongoClient: true }, (err, db) =>{
//     if(err){
//       console.log('Error Opening DB');
//     }else{
//       console.log(`Mongo DB started at port ${config.dbPort}`);
//       app.listen(process.env.PORT || config.serverPort, function(){
//         console.log(`Server started at port ${config.serverPort}`);
//       });
//     }
//   });
// });

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/config", express.static(__dirname + '/config'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname + '/board.html'));
});


require('./db/models');
var api = require('./api/api');
app.use('/api', api);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/takthat",
  { useMongoClient: true }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});