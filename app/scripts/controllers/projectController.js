angular.module('projiApp')

.controller('ProjectController', function($scope, $location, Project, User, $rootScope, Sprint) {
    'use strict';

    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid,
        email = $rootScope.currentUser.email,
        fetchProjects = (function() {
            Project.all().then(function(data) {
                $scope.projects = data;
            });
        }());

    $scope.project = Project.find(projectId);
    $scope.sprints = Sprint.all(projectId);
    $scope.editedSprint = {};
    $scope.newSprint = {};
    $scope.newProject = {};
    $scope.addUser = {};
    $scope.createProject = false;
    $scope.showEditProject = false;

    $scope.users = Project.getUsers(projectId);

    $scope.inviteUser = function() {
        Project.addUser(projectId, $scope.addUser.email);
    };

    $scope.removeUser = function(userId) {
        Project.removeUser(projectId, userId);
    };

    $scope.makeProject = function() {
        Project.create(userId, email, $scope.newProject);
        // fetchProjects();
        $scope.createProject = false;
    };

    $scope.setCurrentProject = function(projectId) {
        User.setCurrentProject(userId, projectId);
    };

    $scope.deleteProject = function(projectId) {
        Project.delete(userId, projectId);
    };

    $scope.createSprint = function() {
        Sprint.create(projectId, $scope.newSprint);
        $scope.newSprint = {};
    };

    $scope.editSprint = function(sprintId) {
        $scope.editedSprint = Sprint.find(projectId, sprintId);
        $scope.sprintId = sprintId;
        $scope.showEditSprint = true;
    };

    $scope.editProject = function(projectId) {
        $scope.editedProject = Project.find(projectId);
        $scope.showEditProject = true;
    };

    $scope.updateProject = function() {
        Project.update($scope.editedProject.$id, $scope.editedProject);
    };

    $scope.updateSprint = function() {
        Sprint.update(projectId, $scope.sprintId, $scope.editedSprint);
    };

    $scope.deleteSprint = function(sprintId) {
        Sprint.delete(projectId, sprintId);
    };

    $scope.hideEditSprint = function() {
        $scope.viewEditSprint = false;
    };
});