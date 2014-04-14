angular.module('projiApp')

.controller('TaskController', function($scope, User, Sprint) {
    'use strict';

    User.getUserId().then(function(userId) {
        User.getProjectId(userId).then(function(projectId) {
            //------
            Sprint.getCurrent(projectId).then(function(sprintId) {

                $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);

                $scope.currentTask = User.getTask(userId);

                $scope.workOnTask = function(taskId, task) {
                    task.taskId = taskId;
                    User.setTask(userId, taskId, task);
                };
            });
            //--------
        });
    });
});