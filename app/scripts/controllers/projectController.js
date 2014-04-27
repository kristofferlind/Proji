angular.module('projiApp')

.controller('ProjectController', function($scope, $location, Project, User, $rootScope, Sprint) {
    'use strict';

    User.getUserId().then(function(userId) {
        User.getProjectId(userId).then(function(projectId) {
            //------
            Project.all().then(function(data) {
                $scope.projects = data;
            });
            $scope.project = Project.find(projectId);
            $scope.sprints = Sprint.all(projectId);
            $scope.sprint = {};
            $scope.newSprint = {};
            $scope.newProject = {};
            $scope.addUser = {};

            $scope.users = Project.getUsers(projectId);

            $scope.inviteUser = function() {
                Project.addUser(projectId, $scope.addUser.userId);
            };

            $scope.removeUser = function(userId) {
                Project.removeUser(projectId, userId);
            };
            $scope.createProject = function() {
                Project.create($scope.newProject);
            };

            $scope.setCurrentProject = function(projectId) {
                User.setCurrentProject(userId, projectId);
                // $rootScope.$digest();
            };

            $scope.deleteProject = function(projectId) {
                Project.delete(projectId);
            };

            $scope.createSprint = function() {
                Sprint.create(projectId, $scope.newSprint);
                $scope.newSprint = {};
            };

            $scope.editSprint = function(sprintId) {
                $scope.sprint = Sprint.find(projectId, sprintId);
                $scope.sprintId = sprintId;
                $scope.viewEditSprint = true;
            };

            $scope.updateSprint = function() {
                Sprint.update(projectId, $scope.sprintId, $scope.sprint);
            };

            $scope.deleteSprint = function(sprintId) {
                Sprint.delete(projectId, sprintId);
            };

            $scope.hideEditSprint = function() {
                $scope.viewEditSprint = false;
            };
            //--------
        });
    });
});