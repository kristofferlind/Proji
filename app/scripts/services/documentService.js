angular.module('projiApp')

.factory('Document', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/documents'),
        dataRef = new Firebase(FBURL + '/firepad'),
        documentsData = $firebase(dataRef),
        documents = $firebase(ref),
        Document = {
            all: function(projectId) {
                return documents.$child(projectId);
            },
            create: function(projectId, document) {
                return documents.$child(projectId).$add(document);
            },
            delete: function(projectId, documentId) {
                documents.$child(projectId).$remove(documentId);
                documentsData.$child(projectId).$remove(documentId);
            },
            find: function(projectId, documentId) {
                return documents.$child(projectId).$child(documentId);
            },
            update: function(projectId, documentId, document) {
                return documents.$child(projectId).$child(documentId).$set(document);
            }
        };

    return Document;
});