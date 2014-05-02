'use strict';

describe('View: document', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('#/document/');
    });

    afterEach(function() {
        browser.ignoreSynchronization = false;
    });

    describe('Feature: Create document', function() {

        it('should create a document on success', function() {
            var nameInput = element(by.css('form input#name')),
                descriptionInput = element(by.css('form input#description')),
                createButton = element(by.css('form .pure-button-primary')),
                lastRowName = element(by.css('table tr:last-child td:first-child')),
                lastRowDescription = element(by.css('table tr:last-child td:nth-child(2)')),
                testName = 'testName' + Math.floor(Math.random() * 1001),
                testDescription = 'testDescription' + Math.floor(Math.random() * 1001);

            nameInput.sendKeys(testName);
            descriptionInput.sendKeys(testDescription);
            createButton.click();

            browser.sleep(500);

            expect(lastRowName.getText()).toEqual(testName);
            expect(lastRowDescription.getText()).toEqual(testDescription);
        });
    });

    describe('Feature: Templates', function() {

    });

    describe('Feature: Documents', function() {

        it('should remove document on clicking delete', function() {
            element.all(by.repeater('(documentId, document) in documents')).then(function(documents) {
                var deleteButton = documents[1].findElement(by.css('td:last-child a'));

                deleteButton.click();

                documents[1].getText().then(function() {
                    expect('error').toEqual('stale element reference');
                }, function(err) {
                    expect(err.state).toEqual('stale element reference');
                });
            });
        });
    });
});