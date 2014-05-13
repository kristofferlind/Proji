'use strict';

describe('View: /login', function() {

    var loginView = require('./loginView.pom.js');

    beforeEach(function() {
        loginView.get();
    });

    describe('Feature: Create account', function() {

        it('should present an error for missing email', function() {
            loginView.register('testUser', '', '12345', '12345');
            expect(loginView.errorMessage.getText()).toEqual('Please enter an email address');
        });

        it('should present an error for missing password', function() {
            loginView.register('testUser', 'test@example.com', '', '12345');
            expect(loginView.errorMessage.getText()).toEqual('Please enter a password');
        });

        it('should present an error for passwords dont match', function() {
            loginView.register('testUser', 'test@example.com', '12345', '54321');
            expect(loginView.errorMessage.getText()).toEqual('Passwords do not match');
        });

        it('should present an error for missing username', function() {
            loginView.register('', 'test@example.com', '12345', '12345');
            expect(loginView.errorMessage.getText()).toEqual('Username required');
        });

        it('should present an error if email is already in use', function() {
            loginView.register('testUser', 'test@example.com', '12345', '12345');
            expect(loginView.errorMessage.getText()).toEqual('Email address is already in use');
            //currently: 'Error: FirebaseSimpleLogin: The specified email address is already in use.'
        });

        // Works, commented out to avoid registering lots of users

        // it('should be successful for correct credentials', function() {
        //     var email = 'test' + Math.floor(Math.random() * 1001) + '@test.com';

        //     loginView.register('testUser', email, '12345', '12345');
        //     expect($('h1').getText()).toEqual('No active project');
        //     //TODO: use overviewView header instead
        // });
    });

    // Not logged in, can't log out..

    //TODO: should use overviewView logout function
    // describe('Feature: Logging out', function() {
    //     it('should log the user out on logout', function() {
    //         $('.home-menu ul li:last-child a').click();
    //         browser.sleep(2000);
    //         expect(browser.getCurrentUrl()).toContain('#/login');
    //     });
    // });

    describe('Feature: Logging in', function() {

        it('should present an error for missing email', function() {
            loginView.login('', 'Password!');
            expect(loginView.errorMessage.getText()).toEqual('Please enter an email address');
        });

        it('should present an error for missing password', function() {
            loginView.login('test@example.com', '');
            expect(loginView.errorMessage.getText()).toEqual('Please enter a password');
        });

        it('should present an error for incorrect password', function() {
            loginView.login('test@example.com', 'wrongPassword');
            expect(loginView.errorMessage.getText()).toEqual('Password is incorrect');
            //Currently: 'Error: FirebaseSimpleLogin: The specified password is incorrect.'
        });

        it('should be successful for correct credentials', function() {
            loginView.login('test@example.com', 'Password!');
            expect($('.content h1').getText()).toEqual('Overview');
        });
    });
});