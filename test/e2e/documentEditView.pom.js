var documentEditView = function() {
    'use strict';

    var documentEditView = {
        textDocumentWrapper: element(by.css('.CodeMirror-wrap')),
        textDocument: element(by.css('#firepad textarea')),
        editDocument: function(text) {
            documentEditView.textDocumentWrapper.click();
            documentEditView.textDocument.clear();
            browser.waitForAngular();
            documentEditView.textDocument.sendKeys(text);
            browser.waitForAngular();
        },
        header: element(by.css('h1')),
        refresh: function() {
            browser.navigate().refresh();
            browser.waitForAngular();
        }
    };

    return documentEditView;
};

module.exports = documentEditView();