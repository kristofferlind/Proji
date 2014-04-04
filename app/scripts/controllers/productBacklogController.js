angular.module('projiApp')

.controller('ProductBacklogController', function($scope, Task, $rootScope) {
    'use strict';

    var user = $rootScope.currentUser,
        projectId = user.pid;

    $scope.tasks = Task.all(projectId);
    $scope.task = {};

    $scope.createTask = function() {
        Task.create(projectId, $scope.task).then(function() {
            $scope.task = {};
        });
    };

    $scope.updateTask = function(taskId, task) {
        Task.update(projectId, taskId, task);
    };

    $scope.deleteTask = function(taskId) {
        Task.delete(projectId, taskId);
    };
});