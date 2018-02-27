const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const takSchema = new Schema({
  title: { type: String, required: true, validate: [
    function(input) {
      return input.length <= 20;
    },
    "Title should be shorter."
  ] },
  body: {type: String, required: true, validate: [
    function(input) {
      return input.length <= 120;
    },
    "Tak should be shorter."
  ] },
  saved: { type: Boolean, default: false },
  priority: { enum: [ "Now!", "Today", "Take your time"] },
  date: { type: Date, default: Date.now, required: true }
});

const Tak = module.exports = mongoose.model("Tak", takSchema);
