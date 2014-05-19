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
                    for (var prop in item) {
                        if (prop === 'points') {
                            if (item[prop] !== '?') {
                                points += item[prop];
                            }
                        }
                    }
                }
            }
            console.log(points);
            return points;
        };

    $scope.pbTasks = Task.all(projectId);
    $scope.pbStatus = 'Not Started';

    $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);

    $scope.pbPoints = calculatePoints($scope.pbTasks);
    $scope.$watch('pbTasks', function() {
        $scope.pbPoints = calculatePoints($scope.pbTasks);
    });
    $scope.sbPoints = calculatePoints($scope.sbTasks);
    $scope.$watch('sbTasks', function() {
        console.log('ran check');
        $scope.sbPoints = calculatePoints($scope.sbTasks);
    });

    $scope.toSprintBacklog = function(taskId, task) {
        Sprint.addTask(projectId, sprintId, taskId, task);
    };

    $scope.fromSprintBacklog = function(taskId) {
        Sprint.removeTask(projectId, sprintId, taskId);
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
    };

    $scope.updateTask = function() {
        Task.update(projectId, $scope.taskId, $scope.editedTask);
        $scope.cancelEditTask();
    };

    $scope.deleteTask = function(taskId) {
        Task.delete(projectId, taskId);
    };
});