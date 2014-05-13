var documentView = function() {
    'use strict';

    var nameInput = element(by.css('form input#name')),
        descriptionInput = element(by.css('form input#description')),
        createButton = element(by.css('form .pure-button-primary')),
        documentView = {
            document1: element(by.css('.document-list tr:first-child')),
            document2: element(by.css('.document-list tr:last-child')),
            document2DeleteButton: documentView.document2.findElement(by.css('td:last-child a')),
            lastDoumentName: element(by.css('table tr:last-child td:first-child')),
            lastDocumentDescription: element(by.css('table tr:last-child td:nth-child(2)')),
            get: function() {
                browser.get('#/document');
                browser.waitForAngular();
            },
            createDocument: function(name, description) {
                nameInput.sendKeys(name);
                descriptionInput.sendKeys(description);
                createButton.click();
                browser.waitForAngular();
            },
            deleteDocument: function() {
                documentView.document2DeleteButton.click();
                browser.waitForAngular();
            },
            editDocument: function() {
                documentView.document1.click();
                browser.waitForAngular();
            }
        };

    return documentView;
};

module.exports = documentView();