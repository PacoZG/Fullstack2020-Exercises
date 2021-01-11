const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
require('dotenv').config()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// models
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

// mongo connection
const url = process.env.MONGO_URI
const JWT_SECRET = process.env.SECRET
console.log('connecting to mongoDB')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
  useNewUrlParser: true})
.then(() => {
  console.log('Connected to mongoDB')
}).catch((error) => {
  console.log('error connection to mongoDB', error.message)
})

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    addBook(title: String, author: String, published: Int, genres: [String]): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, password: String! favoriteGenre: String!): User
    editUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      return await Author.find({}) 
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: { $in: [author.id] } }).populate('author')
      }
      if (!args.author && args.genre) {
        return await Book.find({ genres: { $in: [args.genre.toLowerCase()] } }).populate('author')
      }
      const author = await Author.findOne({ name: args.author })
      const booksByAuthor = await Book.find({ author: { $in: [author.id] } }).populate('author')
      const booksByGenre = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      return booksByAuthor || booksByGenre
    },
    allUsers: async () => {
      return await User.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const bookCount = await Book.find({ author: { $in: root.id } })
      return bookCount.length
    }
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
    id: (root) => root.id
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      //console.log('CONTEXT: ', context.currentUser)
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: null, bookCount: 1 })
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })
      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book})
      
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log('CONTEXT: ', context.currentUser)
      if (!currentUser){
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        password: bcrypt.hash(args.password, 10),
        favoriteGenre: args.favoriteGenre
      })
      try {
        await user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, console.log(error.message), {
          invalidArgs: args,
        })
      }
      return user
    },
    editUser: async (root, args, context) => {
      let user = await User.findOne({ username: args.username })
      user.favoriteGenre = args.favoriteGenre
      try {
        await user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, console.log(error.message), {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || !bcrypt.compare(user.password, args.password)) {
        throw new UserInputError('Wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      //console.log('USERFORTOKEN: ', userForToken)
      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription : {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req.headers.authorization || ''
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})