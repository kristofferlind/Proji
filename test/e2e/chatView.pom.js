var chatView = function() {
    'use strict';

    var chatView = {
        get: function() {
            browser.get('#');
            browser.waitForAngular();
        },
        lastMessage: element(by.css('.chat-message:last-child')),
        sendMessage: function(message) {
            var messageInput = element(by.css('.chat-send'));

            messageInput.sendKeys(message);
            messageInput.sendKeys(protractor.Key.ENTER);
            browser.waitForAngular();
        }
    };

    return chatView;
};

module.exports = chatView();