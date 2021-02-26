/*const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
`mongodb+srv://phonebookbackend:${password}@cluster0.tycpy.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

console.log(process.argv.length)
if (process.argv.length >= 4){
    
    const person = new Person({
    name: name,
    number: number,
    })
    if (name === undefined || number === undefined) {
      console.log('information missing')
      mongoose.connection.close()
  } else {    
    person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
    })
  }
    
} else  {
    Person.find({}).then(result => {
        console.log('phonebook:')
      result.forEach(p => {
        console.log(p.name, p.number)
      })
      mongoose.connection.close()
    })
}*/