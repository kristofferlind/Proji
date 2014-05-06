angular.module('projiApp')

.controller('ChatController', function($scope, $rootScope, User, $firebase, FBURL) {
    'use strict';

    $scope.sendMessage = function() {
        $scope.messages.$add($scope.message);
        $scope.message.text = '';
    };

    var updateView = function() {
        if ($rootScope.currentUser && $rootScope.currentUser.pid) {
            $scope.messages = $firebase(new Firebase(FBURL + '/chat/' + $rootScope.currentUser.pid + '/messages'));
            $scope.user = User.find($rootScope.currentUser.uid);
            $scope.message = {
                md5Hash: $rootScope.currentUser.md5Hash,
                uid: $rootScope.currentUser.uid,
                username: $scope.user.username,
                text: ''
            };
        }
    }, loggedIn = function() {
            $scope.loggedIn = true;
            updateView();
        }, loggedOut = function() {
            $scope.loggedIn = false;
        };

    $rootScope.$watch($rootScope.currentUser, updateView);
    $rootScope.$on('$firebaseSimpleLogin:login', loggedIn);
    $rootScope.$on('$firebaseSimpleLogin:logout', loggedOut);
    $rootScope.$on('resolved', updateView);
    $rootScope.$on('projectChange', updateView);
});