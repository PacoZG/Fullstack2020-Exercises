const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please write your username'],
    unique: [true, 'This username is already in our database'],
    minlength: [3, 'Your username needs at least 3 characters']
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: [4, 'Please write at least 4 characters']
  }
})

module.exports = mongoose.model('User', schema)