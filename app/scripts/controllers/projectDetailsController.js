angular.module('projiApp')

.controller('ProjectDetailsController', function($scope, $routeParams, Project, Sprint) {
    'use strict';

    var projectId = $routeParams.projectId;

    $scope.project = Project.find(projectId);
    $scope.sprints = Sprint.all(projectId);
    $scope.sprint = {};
    $scope.addUser = {};

    $scope.users = Project.getUsers(projectId);

    $scope.inviteUser = function() {
        Project.addUser(projectId, $scope.addUser.userId);
    };

    $scope.removeUser = function(userId) {
        Project.removeUser(projectId, userId);
    };

    $scope.updateProject = function() {
        Project.update(projectId, $scope.project);
    };

    $scope.updateSprint = function(sprintId, sprint) {
        Sprint.update(projectId, sprintId, sprint);
    };

    $scope.createSprint = function() {
        Sprint.create(projectId, $scope.sprint).then(function() {
            $scope.sprint = {};
        });
    };
    $scope.deleteSprint = function(sprintId) {
        Sprint.delete(projectId, sprintId);
    };
});