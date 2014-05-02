'use strict';

describe('View: chatPanel', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('#');
    });

    afterEach(function() {
        browser.ignoreSynchronization = false;
    });

    it('should send a message on enter', function() {
        var messageInput = element(by.css('.chat-send')),
            lastMessage = element(by.css('.chat-message:last-child')),
            testMessage = 'testMessage' + Math.floor(Math.random() * 1001);

        messageInput.sendKeys(testMessage);
        messageInput.sendKeys(protractor.Key.ENTER);

        expect(lastMessage.getText()).toEqual('e2eUser: ' + testMessage);
    });
});