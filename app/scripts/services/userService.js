angular.module('projiApp')

.factory('User', function($firebase, FBURL, simpleLogin, $rootScope, $q, $timeout, Task) {
    'use strict';
    var ref = new Firebase(FBURL + '/users'),
        users = $firebase(ref),
        User = {
            addProject: function(projectId, userId) {
                return users.$child(userId).$child('projects').$child(projectId).$set(projectId);
            },
            create: function(fbUser, username) {
                users[fbUser.uid] = {
                    md5Hash: fbUser.md5_hash,
                    username: username,
                    email: fbUser.email
                };

                users.$save(fbUser.uid).then(function() {
                    User.setCurrentUser(fbUser.uid);
                });
            },
            find: function(userId) {
                if (userId) {
                    return users.$child(userId);
                }
            },
            getCurrentProject: function(userId) {
                var user = $rootScope.currentUser;

                if (user && user.pid !== undefined) {
                    return user.pid;
                } else {
                    return users.$child(userId).projectId;
                }
            },
            getUserId: function() {
                var d = $q.defer();

                var isDone = function() {
                    if ($rootScope.currentUser !== undefined) {
                        d.resolve($rootScope.currentUser.uid);
                    } else {
                        $timeout(isDone, 50);
                    }
                };

                isDone();

                return d.promise;
            },
            getProjectId: function(userId) {
                // return users.$child(userId).projectId;

                var d = $q.defer();

                var projectId = users.$child(userId).projectId;
                users.$on('loaded', function() {
                    d.resolve(projectId);
                });
                return d.promise;
            },
            getCurrentUser: function() {
                return users.$child($rootScope.currentUser.uid);
            },
            getUsername: function(userId) {
                var user = $rootScope.currentUser;

                if (user.username) {
                    return user.username;
                } else {
                    return users.$child(userId).username;
                }
            },
            getProjects: function(userId) {
                return users.$child(userId).$child('projects');
            },
            setCurrentProject: function(userId, projectId) {
                return users.$child(userId).$child('projectId').$set(projectId);
            },
            setCurrentUser: function(fbUser) {
                $rootScope.currentUser = {
                    email: fbUser.email,
                    uid: fbUser.uid,
                    md5Hash: fbUser.md5_hash,
                };
            },
            update: function(uid, user) {
                return users.$child(uid).$update(user);
            },
            startTask: function(projectId, sprintId, userId, taskId, task) {
                task.status = 'In Progress';
                Task.setStatus(projectId, sprintId, taskId, task, 'In Progress');
                return users.$child(userId).$child('task').$set(task);
            },
            getTask: function(userId) {
                return users.$child(userId).$child('task');
            },
            stopTask: function(projectId, sprintId, userId, taskId, task) {
                Task.setStatus(projectId, sprintId, taskId, task, 'Not Started');
                return users.$child(userId).$remove('task');
            },
            finnishTask: function(projectId, sprintId, userId, taskId, task) {
                Task.setStatus(projectId, sprintId, taskId, task, 'Completed');
                return users.$child(userId).$remove('task');
            },
            voteUp: function(userId, ideaId) {
                users.$child(userId).$child('ideas').$child('up').$child(ideaId);
                users.$child(userId).$child('ideas').$child('down').$remove(ideaId);
            },
            voteDown: function(userId, ideaId) {
                users.$child(userId).$child('ideas').$child('down').$child(ideaId);
                users.$child(userId).$child('ideas').$child('up').$remove(ideaId);
            }
        };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, fbUser) {
        User.setCurrentUser(fbUser);
    });

    $rootScope.$on('firebaseSimpleLogin:logout', function() {
        delete $rootScope.currentUser;
    });

    return User;
});