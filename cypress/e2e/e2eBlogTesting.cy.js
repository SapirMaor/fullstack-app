const username = 'testUser123';
const password = 'testPassword123';
const email = 'testUser123@gmail.com';

before(() => {
    cy.visit('http://localhost:3000/');
  
    // Sign up with the new user
    cy.contains('Sign Up').click();
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="name"]').type(username);
    cy.get('input[type="submit"]').click();

    // Wait for the "Public Feed" text to appear on the page - in order to know the forms been submitted
    cy.contains('Public Feed').should('be.visible');
  })

describe('Check profile details correctly correspond with logged-in user info', () => {
    before(() => {
      cy.visit('http://localhost:3000/');
      
      // Find the "Log in" button and click it to go to the login page
      cy.contains('Log in').click();
  
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('input[type="submit"]').click();
    })
  
    it('should show correct user details on My-Profile page', () => {
      // Find and click on the "My Profile" 
      cy.contains('My profile').click();
  
      // Verify if the user details in my profile are correct
      cy.contains(username).should('be.visible');
      cy.contains(email).should('be.visible');
    });
  });

describe('Create a new post with a logged-in user', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
        
        // Find the "Log in" button and click it to go to the login page
        cy.contains('Log in').click();
    
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('input[type="submit"]').click();
      })
  
    it('should create a new post with currently submitted info', () => {
      // Now, you are already logged in, so you can directly create a post
      const postTitle = 'Test Post Title';
      const postContent = 'This is the content of the test post.';
  
      // Find and click on the "New Post" button to create a new post
      cy.contains('New post').click();
  
      cy.get('input[name="title"]').type(postTitle);
      cy.get('textarea[name="content"]').type(postContent);
  
      cy.contains('Create').click();
  
      // Verify if the new post was created successfully
      cy.contains(postTitle).should('be.visible');
      cy.contains(postContent).should('be.visible');
    });
  });
  
describe('Logout of current user session', () => {  
    before(() => {
      cy.visit('http://localhost:3000/');

      // Find the "Log in" button and click it to go to the login page
      cy.contains('Log in').click();
  
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('input[type="submit"]').click();
    })
  
    it('should correclty log out from the current user session when "Log out" button is clicked', () => {
      // Verify if the user logged in succesfully
      cy.contains(username).should('be.visible');
      cy.contains(email).should('be.visible');
  
      // Find the "Log out" button and click it 
      cy.contains('Log out').click();
  
      // Verify if the user logged out succesfully
      cy.contains('Log in').should('be.visible');
    });
  });

describe('Home page to Sign-in page navigation', () => {
    it('should navigate to the sign in page from the home page when "Log in" button is clicked', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find the "Log in" button and click it
      cy.contains('Log in').click()
  
      // The new url 
      cy.url().should('include', '/signInForm')
  
      // The new page 
      cy.get('h1').contains('Sign In')
    })
  })

describe('Home page to Sign-up page navigation', () => {
    it('should navigate to the sign up page from the home page when "Sign in" button is clicked', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find the "Log in" button and click it
      cy.contains('Sign Up').click()
  
      // The new url 
      cy.url().should('include', '/signUpForm')
  
      // The new page 
      cy.get('h1').contains('Sign Up Form')
    })
  })
  

