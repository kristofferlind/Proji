angular.module('projiApp')

.controller('ProfileController', function($scope, $rootScope, User) {
    'use strict';
    var userId = $rootScope.currentUser.uid;

    $scope.user = User.find(userId);

    $scope.update = function() {
        User.update(userId, $scope.user);
    };
});