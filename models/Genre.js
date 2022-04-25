const mongoose = require("mongoose");
const { Schema } = mongoose;

const genreSchema = new Schema({
  name: {
    type: String,
    minLength: 0,
    maxLength: 255,
    required: true,
  },
});

const schema = new mongoose.Schema(genreSchema);
const Genre = mongoose.model("Genre", schema);

module.exports = { Genre, genreSchema };
