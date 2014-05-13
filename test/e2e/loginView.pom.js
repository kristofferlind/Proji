var loginView = function() {
    'use strict';

    var usernameInput = element(by.model('username')),
        emailInput = element(by.model('email')),
        passwordInput = element(by.model('pass')),
        confirmInput = element(by.model('confirm')),
        loginButton = element(by.css('button.pure-button.pure-button-primary')),
        registerButton = element(by.css('button:nth-child(2)')),
        createButton = element(by.css('.pure-button.button-success')),
        loginView = {
            errorMessage: element(by.binding('err')),
            get: function() {
                browser.get('#/login');
                browser.waitForAngular();
            },
            login: function(email, password) {
                emailInput.sendKeys(email);
                passwordInput.sendKeys(password);
                loginButton.click();
                browser.sleep(5000); //wait for firebase :(
                browser.waitForAngular();
            },
            register: function(username, email, password, confirm) {
                registerButton.click();
                usernameInput.sendKeys(username);
                emailInput.sendKeys(email);
                passwordInput.sendKeys(password);
                confirmInput.sendKeys(confirm);
                createButton.click();
                browser.sleep(5000); //wait for firebase :(
                browser.waitForAngular();
            }
        };

    return loginView;
};

module.exports = loginView();