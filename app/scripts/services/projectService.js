'use strict';

angular.module('projiApp')

.factory('Project', function($firebase, FBURL, $rootScope) {
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
            },
            anyCurrent: function() {
                return $rootScope.currentProject !== undefined;
            },
            getCurrent: function() {
                return $rootScope.currentProject;
            },
            setCurrent: function(projectId) {
                $rootScope.currentProject = projectId;
            },
            update: function(projectId, project) {
                return projects.$child(projectId).$set(project);
            }
        };

    return Project;
});