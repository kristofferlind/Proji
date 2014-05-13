'use strict';

describe('View: document', function() {

    var documentView = require('./documentView.pom.js'),
        documentEditView = require('./documentEditView.pom.js');

    beforeEach(function() {
        documentView.get();
    });

    describe('Feature: Create document', function() {

        it('should create a document on success', function() {
            documentView.createDocument('testName', 'testDescription');
            expect(documentView.lastDocumentName.getText()).toEqual('testName');
            expect(documentView.lastDocumentDescription.getText()).toEqual('testDescription');
        });
    });

    describe('Feature: Templates', function() {

        it('should contain a list of templates');

        it('should create template on create');

        it('should delete template on delete');
    });

    describe('Feature: Documents', function() {

        it('should remove document on clicking delete', function() {
            documentView.deleteDocument();

            documentView.document2.getText().then(function() {
                expect('error').toEqual('stale element reference');
            }, function(err) {
                expect(err.state).toEqual('stale element reference');
            });
        });
    });

    describe('Feature: Edit document', function() {

        it('should view the edit view of document', function() {
            documentView.editDocument();
            expect(documentEditView.header.getText()).toEqual('Document');
        });
    });
});

describe('View: edit document', function() {
    var documentEditView = require('./documentEditView.pom.js');

    describe('Feature: Editing', function() {

        it('should edit text', function() {
            documentEditView.editDocument('testText');
            expect(documentEditView.textDocument.getText()).toEqual('testText');
        });

        it('should save text', function() {
            documentEditView.refresh();
            expect(documentEditView.textDocument.getText()).toEqual('testText');
        });
    });
});