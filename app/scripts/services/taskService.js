angular.module('projiApp')

.factory('Task', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/projects'),
        projects = $firebase(ref),
        Task = {
            all: function(projectId) {
                return projects.$child(projectId).$child('tasks');
            },
            create: function(projectId, task) {
                return projects.$child(projectId).$child('tasks').$add(task);
            },
            delete: function(projectId, taskId) {
                return projects.$child(projectId).$child('tasks').$remove(taskId);
            },
            find: function(projectId, taskId) {
                return projects.$child(projectId).$child('tasks').$child(taskId);
            },
            update: function(projectId, taskId, task) {
                return projects.$child(projectId).$child('tasks').$child(taskId).$set(task);
            }
        };

    return Task;
});