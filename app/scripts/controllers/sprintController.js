angular.module('projiApp')

.controller('SprintController', function($scope, User, Sprint, Task, $rootScope) {
    'use strict';
    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid;

    $scope.pbTasks = Task.all(projectId);
    $scope.pbStatus = 'Not Started';


    Sprint.getCurrent(projectId).then(function(sprintId) {
        //Why wont it update?
        // Sprint.getSprintTasks(projectId, sprintId).then(function(sprintData) {
        //     $scope.sbTasks = sprintData;
        // });

        $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);

        $scope.toSprintBacklog = function(taskId, task) {

            Sprint.addTask(projectId, sprintId, taskId, task);
            // $scope.sbTasks[taskId] = task;
            //Task.update (only change status?)
        };

        $scope.fromSprintBacklog = function(taskId) {
            Sprint.removeTask(projectId, sprintId, taskId);
            //A bit tragic having a timeout here.. (currently needed to give firebase a chance to sync)
            // $timeout(function() {
            //     delete $scope.sbTasks[taskId];
            // }, 150);
            //Task.update (new status) inactive/active/done? dragging= inactive? checkbox=done?
        };

        $scope.showEditTask = function(taskId, task) {
            $scope.viewEditTask = true;
            $scope.task = task;
            $scope.taskId = taskId;
        };

        $scope.cancelEditTask = function() {
            $scope.viewEditTask = false;
            // $scope.task = {};
        };

        $scope.createTask = function() {
            Task.create(projectId, $scope.newTask);
            $scope.newTask = {};
        };

        $scope.updateTask = function() {
            Task.update(projectId, $scope.taskId, $scope.task);
            $scope.cancelEditTask();
        };

        $scope.deleteTask = function(taskId) {
            Task.delete(projectId, taskId);
        };
    });

});