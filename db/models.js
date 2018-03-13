const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  text: { type: String, required: true },
  created_at: {type: Date, default: Date.now}
});


const Notes = module.exports = mongoose.model('Notes', notesSchema);
