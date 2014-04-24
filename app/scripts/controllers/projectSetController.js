angular.module('projiApp')

.controller('ProjectSetController', function($scope, User, Project, $location) {
    'use strict';
    User.getUserId().then(function(userId) {
        //------
        Project.all().then(function(data) {
            $scope.projects = data;
        });

        $scope.newProject = {};

        $scope.createProject = function() {
            Project.create(userId, $scope.newProject);
            // $location.path('/project/');
        };

        $scope.setCurrentProject = function(projectId) {
            User.setCurrentProject(userId, projectId);
            $location.path('/project');
        };
    });
});