angular.module('projiApp')

.factory('User', function($firebase, FBURL, simpleLogin, $rootScope, $q, $timeout, Task, Sprint, Notify, $location) {
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
                    User.setCurrentUser(fbUser);
                    Notify.success('User created');
                });
            },
            find: function(userId) {
                if (userId) {
                    return users.$child(userId);
                }
            },
            getCurrentProject: function() {
                User.getUserId().then(function(userId) {
                    var user = $rootScope.currentUser,
                        d = $q.defer(),
                        projectId;

                    if (user && user.pid !== undefined) {
                        d.resolve(user.pid);
                    } else {
                        projectId = users.$child(userId).projectId;
                        $rootScope.currentUser.pid = projectId;
                        d.resolve(projectId);
                    }

                    return d.promise;
                });

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
                var d = $q.defer();

                var projectId = users.$child(userId).projectId;
                users.$on('loaded', function() {
                    d.resolve(projectId);
                });

                users.$on('change', function() {
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
                $rootScope.currentUser.pid = projectId;
                localStorage.pid = projectId;
                $rootScope.currentUser.sid = undefined;
                localStorage.removeItem('sid');

                $rootScope.$broadcast('projectChange');

                users.$child(userId).$child('projectId').$set(projectId).then(function() {
                    Notify.success('Project activated');
                    $location.path('/overview');
                });
            },
            setCurrentUser: function(fbUser) {
                $rootScope.currentUser = {
                    email: fbUser.email,
                    uid: fbUser.uid,
                    md5Hash: fbUser.md5_hash,
                    pid: localStorage.pid || undefined,
                    sid: localStorage.sid || undefined
                };

                User.getProjectId(fbUser.uid).then(function(pid) {
                    if (pid) {
                        console.log('setCurrentUser pid: ' + pid);
                        $rootScope.currentUser.pid = pid;
                        localStorage.pid = pid;

                        Sprint.getCurrent(pid).then(function(sid) {
                            if (sid) {
                                console.log('setCurrentUser sid: ' + sid);
                                $rootScope.currentUser.sid = sid;
                                localStorage.sid = sid;
                            }
                        });
                    }
                });

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