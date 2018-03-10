
const mongoose = require('mongoose');

var notesSchema = new mongoose.Schema({
  text: String,
  created_at: {type: Date, default: Date.now}
});

mongoose.model('Notes', notesSchema);
