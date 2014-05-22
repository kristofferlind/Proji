/*
    Controller for task page (my task)
    view: /task
*/

angular.module('projiApp')

.controller('TaskController', function($scope, User, Sprint, $rootScope) {
    'use strict';

    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid,
        sprintId = $rootScope.currentUser.sid;

    $scope.sbStatus = 'Not Started';
    $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);
    $scope.currentTask = User.getTask(projectId, userId);

    //Set task as active task for user (on dragging task to my task)
    $scope.workOnTask = function(taskId, task) {
        task.taskId = taskId;
        User.startTask(projectId, sprintId, userId, taskId, task);
    };

    //Set task as finished (on dragging task to completed tasks)
    $scope.markTaskAsDone = function() {
        User.finnishTask(projectId, sprintId, userId, $scope.currentTask.taskId, $scope.currentTask);
    };

    //Put task back in sprint backlog (on dragging task to available tasks)
    $scope.stopWorkOnTask = function() {
        User.stopTask(projectId, sprintId, userId, $scope.currentTask.taskId, $scope.currentTask);
    };
});