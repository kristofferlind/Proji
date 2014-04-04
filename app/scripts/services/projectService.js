angular.module('projiApp')

.factory('Project', function($firebase, FBURL, User) {
    'use strict';
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
                // if (projectId !== undefined) {
                return projects.$child(projectId);
                // } else {
                //     return 'no active project';
                // }
            },
            // anyCurrent: function() {
            //     return $rootScope.currentProject !== undefined;
            // },
            getCurrent: function() {
                return projects.$child(User.getCurrentProject());
            },
            // setCurrent: function(projectId) {
            //     $rootScope.currentProject = projectId;
            // },
            update: function(projectId, project) {
                return projects.$child(projectId).$set(project);
            }
        };

    return Project;
});