angular.module('projiApp')

.controller('ProfileController', function($scope, $rootScope, User) {
    'use strict';

    var user = $rootScope.currentUser;

    $scope.user = User.find(user.uid);

    $scope.update = function() {
        User.update(user.uid, $scope.user);
    };
});