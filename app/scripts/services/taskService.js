/*
    Service: Task
    Description: Manages task data on firebase
*/

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
            //Fetch all tasks
            all: function(projectId) {
                return tasks.$child(projectId);
            },
            //Create task
            create: function(projectId, task) {
                task.status = 'Not Started';
                return tasks.$child(projectId).$add(task);
            },
            //Delete task
            delete: function(projectId, taskId, task) {
                //If task has sprintId, remove it and update task
                if (task && task.sprintId) {
                    var sprintId = task.sprintId;
                    delete task.sprintId;
                    Task.update(projectId, taskId, task);
                    //Remove task from sprint
                    sprints.$child(projectId).$child(sprintId).$child('tasks').$remove(taskId);
                }
                //If task has userId, remove task from user
                if (task && task.userId) {
                    users.$child(task.userId).$child(projectId).$remove('task');
                }
                //Remove task
                return tasks.$child(projectId).$remove(taskId);
            },
            //Find task
            find: function(projectId, taskId) {
                return tasks.$child(projectId).$child(taskId);
            },
            //Update task
            update: function(projectId, taskId, task) {
                return tasks.$child(projectId).$child(taskId).$set(task);
            },
            //Set status of task
            setStatus: function(projectId, sprintId, taskId, task, status) {
                var sprintRef = new Firebase(FBURL + '/sprints/' + projectId + '/' + sprintId + '/tasks'),
                    sprintTasks = $firebase(sprintRef);

                //Set status
                task.status = status;
                //Update task in product backlog
                tasks.$child(projectId).$child(taskId).$update(task);
                //Update task in sprint backlog
                sprintTasks.$child(taskId).$update(task);
            }
        };

    return Task;
});