angular.module('projiApp')

.factory('Project', function($firebase, FBURL, User, $rootScope, $q, $timeout) {
    'use strict';
    var ref = new Firebase(FBURL + '/projects'),
        projects = $firebase(ref),
        Project = {
            addUser: function(projectId, userId) {
                //which way is better?
                User.addProject(projectId, userId);
                projects.$child(projectId).$child('users').$add(userId);
            },
            // all: function() {
            //     var userId = $rootScope.currentUser.uid,
            //         projects = [],
            //         usersRef = new Firebase(FBURL + '/users/' + userId + '/projects');

            //     usersRef.once('value', function(data) {
            //         data.forEach(function(projectId) {
            //             projects.push(Project.find(projectId.val()));
            //         });
            //         console.log(projects);
            //         return projects;
            //     });
            // },
            all: function() {
                var userId = $rootScope.currentUser.uid,
                    projects = [],
                    usersRef = new Firebase(FBURL + '/users/' + userId + '/projects');

                var d = $q.defer();

                //Is it possible to solve this using angularfire?
                usersRef.once('value', function(data) {
                    data.forEach(function(projectId) {
                        // projects[projectId.$id] = Project.find(projectId.val());
                        projects.push(Project.find(projectId.val()));
                    });

                    $timeout(function() {
                        d.resolve(projects);
                    });
                });

                return d.promise;
            },
            // all: function() {
            //     //TODO: return only projects user is a part of..
            //     return projects;
            // },
            create: function(project) {
                var uid = $rootScope.currentUser.uid;

                projects.$add(project).then(function(data) {
                    var projectId = data.name();

                    projects.$child(projectId).$child('users').$add(uid);
                });
                // return projects.$add(project);
            },
            delete: function(projectId) {
                return projects.$remove(projectId);
            },
            find: function(projectId) {
                if (projectId !== undefined) {
                    return projects.$child(projectId);
                } else {
                    return 'no active project';
                }
            },
            // anyCurrent: function() {
            //     return $rootScope.currentProject !== undefined;
            // },
            getCurrent: function() {
                return projects.$child(User.getCurrentProject());
            },
            getUsers: function(projectId) {
                return projects.$child(projectId).$child('users');
            },
            // setCurrent: function(projectId) {
            //     $rootScope.currentProject = projectId;
            // },
            removeUser: function(projectId, userId) {
                return projects.$child(projectId).$child('users').$remove(userId);
            },
            update: function(projectId, project) {
                return projects.$child(projectId).$set(project);
            }
        };

    return Project;
});