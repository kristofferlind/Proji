angular.module('projiApp')

.controller('ChatController', function($scope, $rootScope, User, $firebase, FBURL) {
    'use strict';

    User.getUserId().then(function(userId) {
        User.getProjectId(userId).then(function(projectId) {
            //------
            $scope.messages = $firebase(new Firebase(FBURL + '/chat/' + projectId + '/messages'));

            $scope.user = User.find(userId);

            $scope.message = {
                md5Hash: $scope.user.md5Hash,
                uid: userId,
                username: $scope.user.username,
                text: ''
            };

            $scope.sendMessage = function() {
                $scope.messages.$add($scope.message);
                $scope.message.text = '';
            };

            //For some reason ngInclude doesn't dirtycheck, this fixes some errors
            //Better than doing nothing, but not good enough. Presents an error in console.log if already running.
            // $scope.$digest();
            //--------
        });
    });
});