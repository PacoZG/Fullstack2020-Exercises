const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author's name has to be provided"],
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: [6, "Author's name must be at least 4 characters long"],
  },
  born: {
    type: Number,
  },
})

module.exports = mongoose.model('Author', schema)