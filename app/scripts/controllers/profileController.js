angular.module('projiApp')

.controller('ProfileController', function($scope, $rootScope, User) {
    'use strict';
    User.getUserId().then(function(userId) {

        $scope.user = User.find(userId);

        $scope.update = function() {
            User.update(userId, $scope.user);
        };
    });
});