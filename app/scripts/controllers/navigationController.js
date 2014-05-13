angular.module('projiApp')

.controller('NavigationController', function($scope, $location, Project, User, $rootScope) {
    'use strict';

    var updateView = function() {
        if ($rootScope.currentUser && $rootScope.currentUser.pid) {
            $scope.user = User.find($rootScope.currentUser.uid);
            $scope.project = Project.find($rootScope.currentUser.pid);
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

    $scope.init = function() {
        updateView();
    };
});