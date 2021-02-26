const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return;
      },
      message: props => `${props.value} is not a valid name minimum allowed length (3), format (NAME LASTNAME)`
    },
    minlength: 3,
    required: [true, 'Contact name required'],
    unique: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{4}-\d{6}/.test(v);
      },
      message: props => `${props.value} is not a valid number minimum allowed length (8), format (0000-000000)`
    },
    minlength: 8,
    required: [true, 'Contact phone number required']
  }
})

personSchema.plugin(schema => {
  schema.pre('findOneAndUpdate', setRunValidators);
});

function setRunValidators() {
  this.setOptions({ runValidators: true });
}

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)