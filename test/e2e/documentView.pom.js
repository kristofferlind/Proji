var documentView2 = function() {
    'use strict';

    var addDocumentButton = element(by.css('a[ng-click="showAddDocument=true"]')), //element(by.css('a[ng-click="showAddDocument=true"]')),
        nameInput = element(by.css('form input#name')),
        descriptionInput = element(by.css('form input#description')),
        createButton = element(by.css('form .pure-button-primary')),
        deleteButtons = element.all(by.css('button[on-confirm="deleteDocument(documentId)"]')),
        editButtons = element.all(by.css('.fa-pencil')),
        dialogConfirmYes = element(by.css('button[ng-click="yes(dialog)"]')),
        documentView = {
            document1: element(by.css('.document-list tr:nth-child(2) td:first-child a')),
            document2: element(by.css('.document-list tr:last-child td:first-child a')),
            document2DeleteButton: element(by.css('.document-list tr:last-child td:last-child a')),
            lastDoumentName: element(by.css('table tr:last-child td:first-child a')),
            lastDocumentDescription: element(by.css('table tr:last-child td:nth-child(2)')),
            documentNames: element.all(by.css('tbody tr td:first-child a')),
            documentDescriptions: element.all(by.css('tbody tr td:nth-child(2)')),
            get: function() {
                // browser.get('#/document');
                element(by.css('a[href="#/"]')).click();
                browser.waitForAngular();
                element(by.css('a[href="#/document"]')).click();
                browser.waitForAngular();
                // browser.sleep(5000);
            },
            createDocument: function(name, description) {
                // element(by.css('.list-toolbar li a')).click();
                addDocumentButton.click();
                nameInput.sendKeys(name);
                descriptionInput.sendKeys(description);
                createButton.click();
                // browser.sleep(5000);
                browser.waitForAngular();
            },
            deleteDocument: function() {
                deleteButtons.last().click();
                // browser.waitForAngular();
                // documentView.document2DeleteButton.click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
            editDocument: function() {
                // documentView.document1.click();
                editButtons.last().click();
                // browser.sleep(5000);
                browser.waitForAngular();
            }
        };

    return documentView;
};

module.exports = documentView2();