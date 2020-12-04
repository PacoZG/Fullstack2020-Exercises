describe('Blog app', function () {
 
 beforeEach(function() {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  const user = {
   name: 'Paco Zavala',
   username: 'MrPaco',
   password: 'fly23'
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
  cy.visit('http://localhost:3000')
 })
 
 it('front page can be opened', function() {
   cy.contains('Log in to application')
 })

 it('Login form is shown', function () {
  cy.contains('username')
  cy.contains('password')
  cy.contains('login')
 })

 describe('Login', function () {
  it('succeeds with correct credentials', function () {
   cy.contains('login')
   cy.get('#username').type('MrPaco')
   cy.get('#password').type('fly23')
   cy.get('#login-button').click()

   cy.contains('Paco Zavala has logged in')
  })
  it('succeeds with wrong credentials', function () {
   cy.contains('login')
   cy.get('#username').type('MrPaco')
   cy.get('#password').type('wrong')
   cy.get('#login-button').click()

   cy.contains('wrong username or password')
  })
 })

 describe('When logged in', function () {
  beforeEach(function () {
   cy.login({ username: 'MrPaco', password: 'fly23' })
   cy.get('#newblog-button').click()
   cy.get('#title').type('I believe I can fly')
   cy.get('#author').type('Michael Jordan')
   cy.get('#url').type('www.cbb.com')
   cy.get('#create-button').click()
  })

  it('A blog can be created', function () {
   cy.contains('I believe I can fly, by Michael Jordan')
  })

  it('a user can like a blog', function () {
   cy.get('#view-button').click()
   cy.get('#like-button').click()
  })

  it('only creator of the blog can deleted', function () {
   cy.get('#logout-button').click()
   const secondUser = {
    name: 'Micheal Jordan',
    username: 'AirJordan',
    password: 'fly23'
   }
   cy.request('POST', 'http://localhost:3001/api/users/', secondUser)
   cy.get('#username').type('AirJordan')
   cy.get('#password').type('fly23')
   cy.get('#login-button').click()

   cy.get('#view-button').click()
   cy.should('not.contain', '#delete-button')
  })
 })

 describe('Check order of likes', () => {
  beforeEach('First we post many blogs', () => {
   cy.login({ username: 'MrPaco', password: 'fly23' })
  })
  
  it('check likes are in order', function () {

    cy.createBlog( { title: 'Blog 1 ', author: 'Paco Zavala', url: 'www.one.com' } )
    cy.createBlog( { title: 'Blog 2 ', author: 'Paco Zavala', url: 'www.two.com'} )
    cy.createBlog( { title: 'Blog 3 ', author: 'Paco Zavala', url: 'www.three.com' } )
    /*cy.createBlog( { title: 'Blog 4 ', author: 'Paco Zavala', url: 'www.four.com' } )
    cy.createBlog({ title: 'Blog 5 ', author: 'Paco Zavala', url: 'www.five.com' })*/
    
    cy.contains('Blog 1').parent().parent().as('blog1')
    cy.contains('Blog 2').parent().parent().as('blog2')
    cy.contains('Blog 3').parent().parent().as('blog3')
    cy.get('@blog1').contains('view').click()
    cy.get('@blog2').contains('view').click()
    cy.get('@blog3').contains('view').click()

    cy.get(':nth-child(3) > .blog > .detailsVisible > :nth-child(3) > :nth-child(2) > #like-button').as('like1')
    cy.get(':nth-child(2) > .blog > .detailsVisible > :nth-child(3) > :nth-child(2) > #like-button').as('like2')
    cy.get(':nth-child(1) > .blog > .detailsVisible > :nth-child(3) > :nth-child(2) > #like-button').as('like3')    

    cy.get('@like2').click().click().click().click().click()
    cy.get('@like1').click().click()
    cy.get('@like3').click().click().click().click()


    cy.get('.blog').then(blogs => {
      cy.wrap(blogs[0]).contains('likes: 5')
      cy.wrap(blogs[1]).contains('likes: 4')
      cy.wrap(blogs[2]).contains('likes: 2')
    })

  })
 })
})

