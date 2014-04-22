angular.module('projiApp')

.controller('NavigationController', function($scope, $location, Project, User) {
    'use strict';

    User.getUserId().then(function(userId) {
        User.getProjectId(userId).then(function(projectId) {
            //------
            if (projectId) {
                $scope.user = User.find(userId);
                $scope.project = Project.find(projectId);
            } else {
                $location.path('/project/set');
            }
            //--------
        });
    });
});