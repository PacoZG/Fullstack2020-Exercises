const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author's name has to be provided"],
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: [4, "Author's name must be at least 4 characters long"],
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator, {
  message: "An author with that name is already in the db",
})

module.exports = mongoose.model('Author', schema)