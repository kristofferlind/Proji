angular.module('projiApp')

.controller('DocumentController', function(FBURL, User, $scope, Document) {
    'use strict';

    User.getUserId().then(function(userId) {
        User.getProjectId(userId).then(function(projectId) {
            //------

            $scope.documents = Document.all(projectId);
            $scope.document = {};

            $scope.createDocument = function() {
                Document.create(projectId, $scope.document);
                $scope.document = {};
            };

            $scope.deleteDocument = function(documentId) {
                Document.delete(projectId, documentId);
            };

            //--------
        });
    });
});