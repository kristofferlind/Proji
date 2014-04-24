'use strict';

describe('View: /login', function() {

    describe('Feature: Create account', function() {

        beforeEach(function() {
            browser.ignoreSynchronization = true;
            browser.get('#/login');
        });

        afterEach(function() {
            browser.ignoreSynchronization = false;
        });

        it('should present an error for missing email', function() {
            $('button:nth-child(2)').click();
            browser.sleep(100);
            element(by.model('username')).sendKeys('testUser');
            element(by.model('pass')).sendKeys('12345');
            element(by.model('confirm')).sendKeys('12345');
            $('.pure-button.button-success').click();
            browser.sleep(2000);
            expect(element(by.binding('err')).getText()).toEqual('Please enter an email address');
        });

        it('should present an error for missing password', function() {
            $('button:nth-child(2)').click();
            browser.sleep(100);
            element(by.model('username')).sendKeys('testUser');
            element(by.model('email')).sendKeys('test@example.com');
            $('.pure-button.button-success').click();
            browser.sleep(2000);
            expect(element(by.binding('err')).getText()).toEqual('Please enter a password');
        });

        it('should present an error for passwords dont match', function() {
            $('button:nth-child(2)').click();
            browser.sleep(100);
            element(by.model('username')).sendKeys('testUser');
            element(by.model('email')).sendKeys('test@example.com');
            element(by.model('pass')).sendKeys('12345');
            element(by.model('confirm')).sendKeys('54321');
            $('.pure-button.button-success').click();
            browser.sleep(2000);
            expect(element(by.binding('err')).getText()).toEqual('Passwords do not match');
        });

        it('should present an error for missing username', function() {
            $('button:nth-child(2)').click();
            browser.sleep(100);
            element(by.model('email')).sendKeys('test@example.com');
            element(by.model('pass')).sendKeys('12345');
            element(by.model('confirm')).sendKeys('12345');
            $('.pure-button.button-success').click();
            browser.sleep(2000);
            expect(element(by.binding('err')).getText()).toEqual('Username required');
        });

        it('should present an error if email is already in use', function() {
            $('button:nth-child(2)').click();
            browser.sleep(100);
            element(by.model('username')).sendKeys('testUser');
            element(by.model('email')).sendKeys('test@example.com');
            element(by.model('pass')).sendKeys('12345');
            element(by.model('confirm')).sendKeys('12345');
            $('.pure-button.button-success').click();
            browser.sleep(2000);
            expect(element(by.binding('err')).getText()).toEqual('Error: FirebaseSimpleLogin: The specified email address is already in use.');
        });

        it('should be successful for correct credentials', function() {
            var email = 'test' + Math.floor(Math.random() * 1001) + '@test.com';

            $('button:nth-child(2)').click();
            browser.sleep(100);
            element(by.model('username')).sendKeys('testUser');
            element(by.model('email')).sendKeys(email);
            element(by.model('pass')).sendKeys('12345');
            element(by.model('confirm')).sendKeys('12345');
            $('.pure-button.button-success').click();
            browser.sleep(2000);
            expect($('h1').getText()).toEqual('No active project');
        });
    });

    describe('Feature: Logging out', function() {
        it('should log the user out on logout', function() {
            $('.home-menu ul li:last-child a').click();
            browser.sleep(2000);
            expect(browser.getCurrentUrl()).toContain('#/login');
        });
    });

    describe('Feature: Logging in', function() {

        beforeEach(function() {
            browser.ignoreSynchronization = true;
            browser.get('#/login');
        });

        afterEach(function() {
            browser.ignoreSynchronization = false;
        });

        it('should present an error for missing email', function() {
            element(by.model('pass')).sendKeys('Password!');

            $('button.pure-button.pure-button-primary').click();
            expect(element(by.binding('err')).getText()).toEqual('Please enter an email address');
        });

        it('should present an error for missing password', function() {
            element(by.model('email')).sendKeys('test@example.com');

            $('button.pure-button.pure-button-primary').click();
            expect(element(by.binding('err')).getText()).toEqual('Please enter a password');
        });

        it('should present an error for incorrect password', function() {
            element(by.model('email')).sendKeys('test@example.com');
            element(by.model('pass')).sendKeys('wrooong');

            $('button.pure-button.pure-button-primary').click();
            browser.waitForAngular();
            browser.sleep(2000);
            expect(element(by.binding('err')).getText()).toEqual('Error: FirebaseSimpleLogin: The specified password is incorrect.');
        });

        it('should be successful for correct credentials', function() {
            element(by.model('email')).sendKeys('test@example.com');
            element(by.model('pass')).sendKeys('Password!');

            $('button.pure-button.pure-button-primary').click();
            browser.waitForAngular();
            browser.sleep(2000);
            expect($('.content h1').getText()).toEqual('Overview');
        });
    });

});