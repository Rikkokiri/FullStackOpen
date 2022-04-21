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

    describe.only('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog post',
          author: 'T.E. Ster',
          url: 'www.testblog.com/test-blog-post',
        });
        cy.createBlog({
          title: 'Second blog',
          author: 'Another Author',
          url: 'www.blog2.com/posts',
        });
        cy.createBlog({
          title: 'Third blog',
          author: 'Third Author',
          url: 'www.blogthree.com/post',
        });
      });

      it('User can like a blog', function () {
        cy.contains('Second blog').parent().find('button').click();
        cy.contains('www.blog2.com/posts').parent().contains('Likes 0'); // View details

        cy.contains('www.blog2.com/posts') // Press like button
          .parent()
          .contains('Likes')
          .find('button')
          .click();

        cy.contains('www.blog2.com/posts').parent().contains('Likes 1');
      });
    });
  });
});
