import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
    }
    genres
    id
  }
`

const USER_DETAILS = gql `
  fragment UserDetails on User {
    username
    favoriteGenre
    id
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query findBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const ALL_USERS = gql`
  query {
    allUsers {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String, $published: Int, $author: String, $genres: [String]) {
    addBook ( title: $title, published: $published, author: $author, genres: $genres ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_USER = gql`
  mutation createUser ($username: String!, $password: String!, $favoriteGenre: String!){
    createUser (username: $username, password: $password, favoriteGenre: $favoriteGenre) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const EDIT_USER = gql`
  mutation editUser ($username: String!, $favoriteGenre: String!){
    editUser (username: $username, favoriteGenre: $favoriteGenre) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`