/*
    Service: Sprint
    Description: Manages data for sprints on firebase
*/

angular.module('projiApp')

.factory('Sprint', function($firebase, FBURL, $q, Notify, Task) {
    'use strict';
    var ref = new Firebase(FBURL + '/sprints'),
        sprints = $firebase(ref),
        Sprint = {
            //Fetch all sprints
            all: function(projectId) {
                return sprints.$child(projectId);
            },
            //Create sprint
            create: function(projectId, sprint) {
                return sprints.$child(projectId).$add(sprint);
            },
            //Delete sprint
            delete: function(projectId, sprintId) {
                return sprints.$child(projectId).$remove(sprintId);
            },
            //Find sprint
            find: function(projectId, sprintId) {
                return sprints.$child(projectId).$child(sprintId);
            },
            //Fetch currently active sprint
            getCurrent: function(projectId) {
                var now = new Date().getTime(),
                    d = $q.defer();

                //Fetch all sprints
                ref.child('/' + projectId).once('value', function(sprintSnapshot) {
                    var sprintData = sprintSnapshot,
                        found = false;

                    //For each sprint
                    sprintData.forEach(function(data) {
                        var start = new Date(data.child('start').val()),
                            end = new Date(data.child('end').val());

                        //Set starting time to 00:00:00
                        start.setHours(0);
                        start.setMinutes(0);
                        start.setSeconds(0);

                        //Set ending time to 23:59:59
                        end.setHours(23);
                        end.setMinutes(59);
                        end.setSeconds(59);

                        //Convert dates to ms since 1970
                        start = start.getTime();
                        end = end.getTime();

                        //If no is between start and end
                        if (now > start && now < end) {
                            found = true;
                            //Resolve
                            d.resolve(data.name());
                        }
                    });
                    //If current date matches no sprint
                    if (!found) {
                        //Reject the request
                        d.reject('no matching sprint');
                    }
                });
                return d.promise;
            },
            //Update sprint
            update: function(projectId, sprintId, sprint) {
                return sprints.$child(projectId).$child(sprintId).$set(sprint);
            },
            //Add task to sprint backlog
            addTask: function(projectId, sprintId, taskId, task) {
                //If task has points, set sprintId and update task
                if (task.points) {
                    task.sprintId = sprintId;
                    Task.update(projectId, taskId, task);
                    //Add task to sprint backlog
                    return sprints.$child(projectId).$child(sprintId).$child('tasks').$child(taskId).$set(task);
                } else {
                    //Otherwise notify user that points are needed
                    Notify.warning('Task needs to have points specified to be placed in sprint backlog.');
                }
            },
            //Remove task from sprint backlog
            removeTask: function(projectId, sprintId, taskId, task) {
                //Remove sprintId from task if it exists
                if (task.sprintId) {
                    delete task.sprintId;
                }
                //Update task
                Task.update(projectId, taskId, task);
                //Remove task from sprint backlog
                return sprints.$child(projectId).$child(sprintId).$child('tasks').$remove(taskId);
            },
            //Fetch tasks from sprint
            getSprintTasks: function(projectId, sprintId) {
                return sprints.$child(projectId).$child(sprintId).$child('tasks');
            }
        };

    return Sprint;
});