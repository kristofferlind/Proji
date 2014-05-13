angular.module('projiApp')

.controller('DocumentController', function(FBURL, User, $scope, Document, $rootScope) {
    'use strict';

    var projectId = $rootScope.currentUser.pid;

    $scope.documents = Document.all(projectId);
    $scope.document = {};

    $scope.createDocument = function() {
        Document.create(projectId, $scope.document);
        $scope.document = {};
    };

    $scope.deleteDocument = function(documentId) {
        Document.delete(projectId, documentId);
    };

});