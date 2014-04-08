angular.module('projiApp')

.controller('ChatController', function($scope, $rootScope, $firebase, FBURL) {
    'use strict';
    $scope.messages = $firebase(new Firebase(FBURL + '/chat/' + $rootScope.currentUser.pid + '/messages'));

    $scope.message = {
        md5Hash: $rootScope.currentUser.md5Hash,
        uid: $rootScope.currentUser.uid,
        username: $rootScope.currentUser.username,
        text: ''
    };

    $scope.sendMessage = function() {
        $scope.messages.$add($scope.message);
        $scope.message.text = '';
    };
});