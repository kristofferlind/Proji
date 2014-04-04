angular.module('projiApp')

.controller('MainController', function($scope, Project, User, $rootScope) {
    'use strict';

    // var projectId = $rootScope.currentUser.pid;

    // if (projectId) {
    $scope.project = Project.getCurrent();
    // }

    $scope.user = User.find($rootScope.currentUser.uid);
});