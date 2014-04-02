angular.module('projiApp')

//Might be more effective to store active projectId and do sprints = $firebase(ref).$child(projectId)
//Downside is that active project needs to change to change settings for sprints..

.factory('Sprint', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/projects'),
        projects = $firebase(ref),
        Sprint = {
            all: function(projectId) {
                return projects.$child(projectId).$child('sprints');
            },
            create: function(projectId, sprint) {
                return projects.$child(projectId).$child('sprints').$add(sprint);
            },
            delete: function(projectId, sprintId) {
                return projects.$child(projectId).$child('sprints').$remove(sprintId);
            },
            find: function(projectId, sprintId) {
                return projects.$child(projectId).$child('sprints').$child(sprintId);
            },
            update: function(projectId, sprintId, sprint) {
                return projects.$child(projectId).$child('sprints').$child(sprintId).$set(sprint);
            }
        };

    return Sprint;
});