'use strict';

angular.module('projiApp')

.factory('Project', function($firebase, FBURL) {
    var ref = new Firebase(FBURL + '/projects'),
        projects = $firebase(ref),
        Project = {
            all: projects,
            create: function(project) {
                return projects.$add(project);
            },
            delete: function(projectId) {
                return projects.$remove(projectId);
            },
            find: function(projectId) {
                return projects.$child(projectId);
            }
        };

    return Project;
});