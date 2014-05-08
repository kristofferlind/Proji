angular.module('projiApp')

.controller('TaskController', function($scope, User, Sprint, $rootScope) {
    'use strict';
    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid;

    Sprint.getCurrent(projectId).then(function(sprintId) {

        $scope.sbStatus = 'Not Started';
        $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);

        $scope.currentTask = User.getTask(userId);

        $scope.workOnTask = function(taskId, task) {
            task.taskId = taskId;
            User.startTask(projectId, sprintId, userId, taskId, task);
        };

        $scope.markTaskAsDone = function() {
            User.finnishTask(projectId, sprintId, userId, $scope.currentTask.taskId, $scope.currentTask);
        };

        $scope.stopWorkOnTask = function() {
            User.stopTask(projectId, sprintId, userId, $scope.currentTask.taskId, $scope.currentTask);
        };
    });

});