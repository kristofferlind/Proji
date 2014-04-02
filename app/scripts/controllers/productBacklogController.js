angular.module('projiApp')

.controller('ProductBacklogController', function($scope, Task, Project) {
    'use strict';

    var projectId = Project.getCurrent();

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