angular.module('projiApp')

.controller('SprintController', function($scope, Sprint, Task, $rootScope) {
    'use strict';
    var projectId = $rootScope.currentUser.pid,
        sprintId = $rootScope.currentUser.sid,
        calculatePoints = function(values) {
            var points = 0;

            for (var key in values) {
                if (key.substr(0, 1) !== '$') {
                    var item = values[key];
                    if (item.points && item.points !== '?' && item.status && item.status !== 'Completed') {
                        points += parseInt(item.points);
                    }
                }
            }
            return points;
        };

    $scope.$watchCollection('sbTasks', function() {
        $scope.sbPoints = calculatePoints($scope.sbTasks);
    });

    $scope.$watchCollection('pbTasks', function() {
        $scope.pbPoints = calculatePoints($scope.pbTasks);
    });

    $scope.pbTasks = Task.all(projectId);
    $scope.pbStatus = 'Not Started';

    $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);

    $scope.pbPoints = calculatePoints($scope.pbTasks);
    $scope.sbPoints = calculatePoints($scope.sbTasks);

    $scope.toSprintBacklog = function(taskId, task) {
        Sprint.addTask(projectId, sprintId, taskId, task);
        // $scope.sbPoints = calculatePoints($scope.sbTasks);
    };

    $scope.fromSprintBacklog = function(taskId, task) {
        Sprint.removeTask(projectId, sprintId, taskId, task);
        // $scope.sbPoints = calculatePoints($scope.sbTasks);
    };

    $scope.showEditTask = function(taskId) {
        $scope.viewEditTask = true;
        $scope.editedTask = Task.find(projectId, taskId);
        $scope.taskId = taskId;
    };

    $scope.cancelEditTask = function() {
        $scope.viewEditTask = false;
    };

    $scope.createTask = function() {
        Task.create(projectId, $scope.newTask);
        $scope.newTask = {};
        // $scope.pbPoints = calculatePoints($scope.pbTasks);
    };

    $scope.updateTask = function() {
        Task.update(projectId, $scope.taskId, $scope.editedTask);
        $scope.cancelEditTask();
        // $scope.pbPoints = calculatePoints($scope.pbTasks);
    };

    $scope.deleteTask = function(taskId, task) {
        Task.delete(projectId, taskId, task);
    };
});