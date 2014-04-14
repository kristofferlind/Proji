angular.module('projiApp')

.controller('SprintController', function($scope, User, Sprint, Task) {
    'use strict';

    User.getUserId().then(function(userId) {
        User.getProjectId(userId).then(function(projectId) {
            //------
            $scope.pbTasks = Task.all(projectId);


            Sprint.getCurrent(projectId).then(function(sprintId) {
                //Why wont it update?
                // Sprint.getSprintTasks(projectId, sprintId).then(function(sprintData) {
                //     $scope.sbTasks = sprintData;
                // });

                $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);

                $scope.toProductBacklog = function(taskId) {
                    Sprint.removeTask(projectId, sprintId, taskId);
                    //A bit tragic having a timeout here.. (currently needed to give firebase a chance to sync)
                    // $timeout(function() {
                    //     delete $scope.sbTasks[taskId];
                    // }, 150);
                    //Task.update (new status) inactive/active/done? dragging= inactive? checkbox=done?
                };

                $scope.toSprintBacklog = function(taskId, task) {
                    console.log(taskId);
                    console.log(task);
                    Sprint.addTask(projectId, sprintId, taskId, task);
                    // $scope.sbTasks[taskId] = task;
                    //Task.update (only change status?)
                };

                $scope.toPB = function(taskId, task) {
                    console.log(taskId);
                    console.log(task);
                };
            });
            //--------
        });
    });
});