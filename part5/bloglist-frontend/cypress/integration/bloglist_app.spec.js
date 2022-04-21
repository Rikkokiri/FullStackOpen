describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'troyboi',
      name: 'Troy Henry',
      password: 'v!bez',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('Login');
    cy.contains('New blog').should('not.exist');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('troyboi');
      cy.get('#password').type('v!bez');
      cy.get('#submit-login').click();

      cy.contains('Troy Henry logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('troyboi');
      cy.get('#password').type('notavibe');
      cy.get('#submit-login').click();

      cy.contains('Invalid username or password');
      cy.get('.error').should('contain', 'Invalid username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(139, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'troyboi', password: 'v!bez' });
    });

    it('A blog can be created', function () {
      cy.contains('New blog').click();
      cy.get('#title').type('Test blog post');
      cy.get('#author').type('T.E. Ster');
      cy.get('#url').type('www.testblog.com/test-blog-post');
      cy.get('#submit-create').click();
      cy.contains('Test blog post by T.E. Ster');
    });
  });
});
