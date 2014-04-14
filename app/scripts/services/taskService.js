angular.module('projiApp')

.factory('Task', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/tasks'),
        tasks = $firebase(ref),
        Task = {
            all: function(projectId) {
                return tasks.$child(projectId);
            },
            create: function(projectId, task) {
                return tasks.$child(projectId).$add(task);
            },
            delete: function(projectId, taskId) {
                return tasks.$child(projectId).$remove(taskId);
                //Also needs to check if the task exists in any sprint and delete it from there
            },
            find: function(projectId, taskId) {
                return tasks.$child(projectId).$child(taskId);
            },
            update: function(projectId, taskId, task) {
                return tasks.$child(projectId).$child(taskId).$set(task);
            }
        };

    return Task;
});