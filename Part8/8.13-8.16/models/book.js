const mongoose = require('mongoose')

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

module.exports = mongoose.model('Book', schema)