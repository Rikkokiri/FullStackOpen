describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`).then(() =>
      console.log('DB reset')
    )
    cy.createUser({
      username: 'troyboi',
      password: 'v!bez',
      name: 'Troy Henry',
    })
    cy.visit('')
  })

  /**
   * 5.17 - Configure Cypress for your project. Make a test for checking
   * that the application displays the login form by default.
   */
  it('Login form is shown', function () {
    cy.get('.form-login').should('be.visible')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#submit-login').should('be.visible').contains('Login')
    cy.contains('New blog').should('not.exist')
  })

  /**
   * 5.18 - Make tests for logging in. Test both successful and unsuccessful
   * login attempts. Make a new user in the beforeEach block for the tests.
   */
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('troyboi')
      cy.get('#password').type('v!bez')
      cy.get('#submit-login').click()

      cy.contains('Troy Henry logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('troyboi')
      cy.get('#password').type('notavibe')
      cy.get('#submit-login').click()

      cy.contains('Invalid username or password')
      // Optional bonus exercise: Check that the notification shown with unsuccessful
      // login is displayed red.
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .should('have.css', 'color', 'rgb(136, 9, 6)')

      cy.should('not.contain', 'Troy Henry logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'troyboi', password: 'v!bez' })
    })

    afterEach(() => {
      cy.contains('Log out').click()
    })

    /**
     * 5.19 - Make a test that verifies a logged-in user can create a new blog.
     */
    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Test blog post')
      cy.get('#author').type('T.E. Ster')
      cy.get('#url').type('www.testblog.com/test-blog-post')
      cy.get('#submit-create').click()

      // The test has to ensure that a new blog is added to the list of all blogs.
      cy.contains('Test blog post by T.E. Ster')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog post',
          author: 'T.E. Ster',
          url: 'www.testblog.com/test-blog-post',
        })
        cy.createBlog({
          title: 'Second blog',
          author: 'Another Author',
          url: 'www.blog2.com/posts',
        })
        cy.createBlog({
          title: 'Third blog',
          author: 'Third Author',
          url: 'www.blogthree.com/post',
        })
      })

      /**
       * 5.20 - Make a test that confirms users can like a blog.
       */
      it('User can like a blog', function () {
        cy.contains('.blog-entry', 'Second blog').as('blogEntry')
        cy.get('@blogEntry').contains('View').click()
        cy.get('@blogEntry').contains('0 likes')
        cy.get('@blogEntry').contains('Like').click() // Press like button
        cy.get('@blogEntry').contains('1 like')
      })

      /**
       * 5.21 - Make a test for ensuring that the user who created a blog can delete it.
       */
      it('User can delete a blog they created', function () {
        cy.contains('.blog-entry', 'Test blog').as('blogEntry')
        cy.get('@blogEntry').contains('View').click() // Reveal details
        cy.get('@blogEntry').contains('Remove').click()
      })

      /**
       * 5.22 - Make a test for ensuring that only the creator
       * can see the delete button of a blog, not anyone else.
       */
      it('User cannot delete blogs created by others', function () {
        cy.visit('/')
        cy.contains('Log out').click()

        cy.createUser({
          username: 'lilnasx',
          password: 'montero',
          name: 'Lil Nas X',
        })

        // Log main test user out and log in with new user
        cy.login({ username: 'lilnasx', password: 'montero' })

        cy.contains('.blog-entry', 'Test blog').as('blogEntry')
        cy.get('@blogEntry').contains('View').click()
        cy.get('@blogEntry').contains('troyboi') // Check that belongs to other user

        // Remove button should not even be available
        cy.get('@blogEntry').contains('Remove').should('not.exist')
      })

      /**
       * 5.23 - Make a test that checks that the blogs are ordered according to
       * likes with the blog with the most likes being first.
       */
      it('blogs are ordered by likes', function () {
        cy.contains('.blog-entry', 'Second blog').as('blog2')
        cy.get('@blog2').contains('View').click()
        cy.get('@blog2').contains('0 likes')
        cy.get('@blog2').contains('Like').click()
        cy.get('@blog2').contains('1 like')
        cy.get('@blog2').contains('Hide').click()

        cy.get('.blog-entry').first().contains('Second blog')

        cy.contains('.blog-entry', 'Third blog').as('blog3')
        cy.get('@blog3').contains('View').click()
        cy.get('@blog3').contains('0 likes')
        cy.get('@blog3').contains('Like').click()
        cy.get('@blog3').contains('1 like')
        cy.get('@blog3').contains('Like').click()
        cy.get('@blog3').contains('2 likes')
        cy.get('@blog3').contains('Hide').click()

        cy.get('.blog-entry').first().contains('Third blog')
        cy.get('.blog-entry').last().contains('Test blog')
      })
    })
  })
})
