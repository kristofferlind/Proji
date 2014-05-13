'use strict';

describe('View: chatPanel', function() {

    var chatView = require('./chatView.pom.js');

    beforeEach(function() {
        chatView.get();
    });

    it('should send a message on enter', function() {
        chatView.sendMessage('testMessage');
        expect(chatView.lastMessage.getText()).toEqual('e2eUser: testMessage');
    });
});