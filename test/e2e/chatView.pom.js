var chatView = function() {
    'use strict';

    var chatView = {
        //elements
        messages: element.all(by.css('.chat-message')),

        //actions
        get: function() {
            element(by.css('a[href="#/project"]')).click();
            browser.waitForAngular();
            element(by.css('a[href="#/"]')).click();
            browser.waitForAngular();

            // browser.get('#');
            // browser.waitForAngular();
        },
        sendMessage: function(message) {
            var messageInput = element(by.css('.chat-send')),
                toggleChat = element(by.css('a[ng-click="collapsed=!collapsed"]'));

            toggleChat.click();
            messageInput.sendKeys(message);
            messageInput.sendKeys(protractor.Key.ENTER);
            browser.waitForAngular();
        }
    };

    return chatView;
};

module.exports = chatView();