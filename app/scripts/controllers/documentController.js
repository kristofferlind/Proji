/*
    Controller for view of documents list
    view: /document
*/

angular.module('projiApp')

.controller('DocumentController', function(FBURL, User, $scope, Document, $rootScope) {
    'use strict';

    var projectId = $rootScope.currentUser.pid;

    //document list
    $scope.documents = Document.all(projectId);
    $scope.document = {};

    //create document
    $scope.createDocument = function() {
        Document.create(projectId, $scope.document);
        $scope.document = {}; //clear current document
        $scope.showAddDocument = false; //remove modal
    };

    //delete document
    $scope.deleteDocument = function(documentId) {
        Document.delete(projectId, documentId);
    };

});