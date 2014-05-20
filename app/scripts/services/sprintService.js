angular.module('projiApp')

.factory('Sprint', function($firebase, FBURL, $q, Notify, Task) {
    'use strict';
    var ref = new Firebase(FBURL + '/sprints'),
        sprints = $firebase(ref),
        Sprint = {
            all: function(projectId) {
                return sprints.$child(projectId);
            },
            create: function(projectId, sprint) {
                return sprints.$child(projectId).$add(sprint);
            },
            delete: function(projectId, sprintId) {
                return sprints.$child(projectId).$remove(sprintId);
            },
            find: function(projectId, sprintId) {
                return sprints.$child(projectId).$child(sprintId);
            },
            getCurrent: function(projectId) {
                var now = new Date().getTime(),
                    d = $q.defer();

                ref.child('/' + projectId).once('value', function(sprintSnapshot) {
                    var sprintData = sprintSnapshot,
                        found = false;

                    sprintData.forEach(function(data) {
                        var start = new Date(data.child('start').val()),
                            end = new Date(data.child('end').val());

                        start.setHours(0);
                        start.setMinutes(0);
                        end.setHours(23);
                        end.setMinutes(59);

                        start = start.getTime();
                        end = end.getTime();

                        if (now > start && now < end) {
                            found = true;
                            d.resolve(data.name());
                        }
                    });
                    if (!found) {
                        d.reject('no matching sprint');
                    }
                });
                return d.promise;
            },
            update: function(projectId, sprintId, sprint) {
                return sprints.$child(projectId).$child(sprintId).$set(sprint);
            },
            addTask: function(projectId, sprintId, taskId, task) {
                if (task.points) {
                    task.sprintId = sprintId;
                    Task.update(projectId, taskId, task);
                    return sprints.$child(projectId).$child(sprintId).$child('tasks').$child(taskId).$set(task);
                } else {
                    Notify.warning('Task needs to have points specified to be placed in sprint backlog.');
                }
            },
            removeTask: function(projectId, sprintId, taskId, task) {
                if (task.sprintId) {
                    delete task.sprintId;
                }
                Task.update(projectId, taskId, task);
                return sprints.$child(projectId).$child(sprintId).$child('tasks').$remove(taskId);
            },
            getSprintTasks: function(projectId, sprintId) {
                //The method for fetching this data destroys autosync?
                //Maybe i should just store the full taskdata instead of making it complicated.
                //Making all these lookups slows the application down.

                //Simple, better solution (will require more complex code for deleting a task from product backlog, but should be better)
                return sprints.$child(projectId).$child(sprintId).$child('tasks');

                //JS
                // var d = $q.defer(),
                //     sprintsRef = new Firebase(FBURL + '/sprints/' + projectId + '/' + sprintId + '/tasks');

                // sprintsRef.once('value', function(sprintData) {
                //     var tasks = {};
                //     sprintData.forEach(function(taskId) {
                //         tasks[taskId.name()] = Task.find(projectId, taskId.val());
                //     });
                //     $timeout(function() {
                //         d.resolve(tasks);
                //     });
                // });
                // return d.promise;

                //Angularfire
                // sprints.$child(projectId).$child(sprintId).$on('loaded', function(sprintData) {
                //     var tasks = {};
                //     sprintData.forEach('value', function(taskId) {
                //         tasks[taskId.name()] = Task.find(projectId, taskId);
                //     });
                //     return tasks;
                // });
            }
        };

    return Sprint;
});