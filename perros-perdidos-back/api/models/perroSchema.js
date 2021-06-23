const { Schema, model } = require("mongoose");

const perroSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  cel: {
    type: Number,
    required: true,
  },
  animalPic: {
    type: String,
    required: true,
  },
  firebase_id: {
    type: String,
  },
});

module.exports = model("perros", perroSchema);
