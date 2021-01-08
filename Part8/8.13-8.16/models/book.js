const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title has to be provided'],
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: [3, 'Book title must be at least 2 characters long']
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [{ type: String}]
})

schema.plugin(uniqueValidator, {
  message: "A book with that name is already in the db",
})

module.exports = mongoose.model('Book', schema)