angular.module('projiApp')

.factory('Task', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/tasks'),
        sprintsRef = new Firebase(FBURL + '/sprints'),
        sprints = $firebase(sprintsRef),
        tasks = $firebase(ref),
        usersRef = new Firebase(FBURL + '/users'),
        users = $firebase(usersRef),
        Task = {
            all: function(projectId) {
                return tasks.$child(projectId);
            },
            create: function(projectId, task) {
                task.status = 'Not Started';
                return tasks.$child(projectId).$add(task);
            },
            delete: function(projectId, taskId, task) {
                if (task && task.sprintId) {
                    var sprintId = task.sprintId;
                    delete task.sprintId;
                    Task.update(projectId, taskId, task);
                    sprints.$child(projectId).$child(sprintId).$child('tasks').$remove(taskId);
                }
                if (task && task.userId) {
                    users.$child(task.userId).$child(projectId).$remove('task');
                }
                return tasks.$child(projectId).$remove(taskId);
                //Also needs to check if the task exists in any sprint and delete it from there
            },
            find: function(projectId, taskId) {
                return tasks.$child(projectId).$child(taskId);
            },
            update: function(projectId, taskId, task) {
                return tasks.$child(projectId).$child(taskId).$set(task);
            },
            setStatus: function(projectId, sprintId, taskId, task, status) {
                var sprintRef = new Firebase(FBURL + '/sprints/' + projectId + '/' + sprintId + '/tasks'),
                    sprintTasks = $firebase(sprintRef);

                task.status = status;
                tasks.$child(projectId).$child(taskId).$update(task);
                sprintTasks.$child(taskId).$update(task);
            }
        };

    return Task;
});