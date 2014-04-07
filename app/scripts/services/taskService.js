angular.module('projiApp')

.factory('Task', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/tasks'),
        tasks = $firebase(ref),
        Task = {
            all: function(projectId) {
                return tasks.$child(projectId);
                // return projects.$child(projectId).$child('tasks');
            },
            create: function(projectId, task) {
                return tasks.$child(projectId).$add(task);
                // return projects.$child(projectId).$child('tasks').$add(task);
            },
            delete: function(projectId, taskId) {
                return tasks.$child(projectId).$remove(taskId);
                // return projects.$child(projectId).$child('tasks').$remove(taskId);
            },
            find: function(projectId, taskId) {
                return tasks.$child(projectId).$child(taskId);
                // return projects.$child(projectId).$child('tasks').$child(taskId);
            },
            update: function(projectId, taskId, task) {
                return tasks.$child(projectId).$child(taskId).$set(task);
                // return projects.$child(projectId).$child('tasks').$child(taskId).$set(task);
            }
        };

    return Task;
});