'use strict';

describe('View: document', function() {

    var documentView = require('./documentView.pom.js'),
        documentEditView = require('./documentEditView.pom.js');

    // //testing..
    // it('DEBUG: login only', function() {
    //     var loginView = require('./loginView.pom.js');
    //     loginView.get();
    //     loginView.login('test@example.com', 'Password!', true);
    // });


    // beforeEach(function() {
    //     documentView.get();
    // });

    it('should not fail on load', function() {
        documentView.get();
    });

    describe('Feature: Create document', function() {

        it('should create a document on success', function() {
            documentView.createDocument('testName', 'testDescription');
            expect(documentView.documentNames.last().getText()).toEqual('testName');
            expect(documentView.documentDescriptions.last().getText()).toEqual('testDescription');
            // expect(documentView.lastDocumentName.getText()).toEqual('testName');
            // expect(documentView.lastDocumentDescription.getText()).toEqual('testDescription');
        });
    });

    // describe('Feature: Templates', function() {

    //     it('should contain a list of templates');

    //     it('should create template on create');

    //     it('should delete template on delete');
    // });

    describe('Feature: Documents', function() {

        it('should remove document on clicking delete', function() {
            documentView.deleteDocument();

            expect(documentView.documentNames.last().getText()).not.toEqual('testName');
            expect(documentView.documentDescriptions.last().getText()).not.toEqual('testDescription');
        });
    });

    describe('Feature: Edit document', function() {

        it('should view the edit view of document', function() {
            documentView.editDocument();
            expect(documentEditView.header.getText()).toEqual('Document');
        });
    });
});

//This should have already been extensively tested, skip until implementing templates..
// describe('View: edit document', function() {
//     var documentEditView = require('./documentEditView.pom.js');

//     describe('Feature: Editing', function() {

//         it('should edit text', function() {
//             documentEditView.editDocument('testText');
//             expect(documentEditView.textDocument.getText()).toEqual('testText');
//         });

//         it('should save text', function() {
//             documentEditView.refresh();
//             expect(documentEditView.textDocument.getText()).toEqual('testText');
//         });
//     });
// });