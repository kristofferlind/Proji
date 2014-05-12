angular.module('projiApp')

.controller('ProjectSetController', function($scope, $rootScope, User, Project) {
    'use strict';
    User.getUserId().then(function(userId) {
        //------

        var email = $rootScope.currentUser.email;

        Project.all().then(function(data) {
            $scope.projects = data;
        });

        $scope.newProject = {};

        $scope.createProject = function() {
            Project.create(userId, email, $scope.newProject);
        };

        $scope.setCurrentProject = function(projectId) {
            User.setCurrentProject(userId, projectId);
        };

        $scope.deleteProject = function(projectId) {
            Project.delete(userId, projectId);
        };

        $scope.editProject = function(projectId) {
            $scope.changeProject = Project.find(projectId);
            $scope.showEditProject = true;
        };

        $scope.updateProject = function() {
            Project.update($scope.editProject.$id, $scope.editProject);
        };

    });
});