/*
    Service: Document
    Description: Acts as a service for managing document data on firebase.

    projectId should probably be managed in that active service,
    then it could be skipped as an argument everywhere (could use $rootScope.currentUser.pid aswell)
    Actually, Active could just be a wrapper for that. (Active.projectId, Active.userId..)
*/

angular.module('projiApp')

.factory('Document', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/documents'),
        dataRef = new Firebase(FBURL + '/firepad'),
        documentsData = $firebase(dataRef),
        documents = $firebase(ref),
        Document = {
            //Return all documents
            all: function(projectId) {
                return documents.$child(projectId);
            },
            //Create document
            create: function(projectId, document) {
                return documents.$child(projectId).$add(document);
            },
            //Delete document
            delete: function(projectId, documentId) {
                documents.$child(projectId).$remove(documentId); //delete meta (details)
                documentsData.$child(projectId).$remove(documentId); //delete actual document
            },
            //Find specific document details
            find: function(projectId, documentId) {
                return documents.$child(projectId).$child(documentId);
            },
            //Update document details
            update: function(projectId, documentId, document) {
                return documents.$child(projectId).$child(documentId).$set(document);
            }
        };

    return Document;
});