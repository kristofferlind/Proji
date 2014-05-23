/*
    Service: User
    Description: Manages user data on firebase
*/

angular.module('projiApp')

.factory('User', function($firebase, FBURL, simpleLogin, $rootScope, $q, $timeout, Task, Sprint, Notify, $location) {
    'use strict';
    var ref = new Firebase(FBURL + '/users'),
        users = $firebase(ref),
        User = {
            //Add project to user
            addProject: function(projectId, userId) {
                return users.$child(userId).$child('projects').$child(projectId).$set(projectId);
            },
            //Create user
            create: function(fbUser, username) {
                //Setup user object
                users[fbUser.uid] = {
                    md5Hash: fbUser.md5_hash,
                    username: username,
                    email: fbUser.email
                };

                //Save user object
                users.$save(fbUser.uid).then(function() {
                    //Set user as currentUser
                    User.setCurrentUser(fbUser);
                    Notify.success('User created');
                });
            },
            //Find user
            find: function(userId) {
                if (userId) {
                    return users.$child(userId);
                }
            },
            //Get current project of user (i think this is dead code..)
            getCurrentProject: function() {
                //Fetch userId
                User.getUserId().then(function(userId) {
                    var user = $rootScope.currentUser,
                        d = $q.defer(),
                        projectId;

                    //If user object has pid, resolve pid
                    if (user && user.pid !== undefined) {
                        d.resolve(user.pid);
                    } else {
                        //Otherwise fetch projectId from database and resolve
                        projectId = users.$child(userId).projectId;
                        $rootScope.currentUser.pid = projectId;
                        d.resolve(projectId);
                    }

                    return d.promise;
                });

            },
            //Get userId
            //Tries to resolve userId every 50ms until its done and then resolves
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
            //Get projectId
            getProjectId: function(userId) {
                var d = $q.defer();

                //Fetch projectId
                var projectId = users.$child(userId).projectId;
                //Resolve when query is done
                users.$on('loaded', function() {
                    d.resolve(projectId);
                });

                //Resolve on change (this probably doesn't work)
                users.$on('change', function() {
                    d.resolve(projectId);
                });

                return d.promise;
            },
            //Get current user (dead code?)
            getCurrentUser: function() {
                return users.$child($rootScope.currentUser.uid);
            },
            //Get username (dead code?)
            getUsername: function(userId) {
                var user = $rootScope.currentUser;

                //If user object has username, return it
                if (user.username) {
                    return user.username;
                } else {
                    //Otherwise fetch from database
                    return users.$child(userId).username;
                }
            },
            //Get projects
            getProjects: function(userId) {
                return users.$child(userId).$child('projects');
            },
            //Set current project
            setCurrentProject: function(userId, projectId) {
                //Save projectId on user object and localstorage
                $rootScope.currentUser.pid = projectId;
                localStorage.pid = projectId;

                //Remove sprintId from user object and localstorage
                $rootScope.currentUser.sid = undefined;
                localStorage.removeItem('sid');

                //Broadcast event that project has changed (user by ng-includes for updating views)
                $rootScope.$broadcast('projectChange');

                //Set projectId in database
                users.$child(userId).$child('projectId').$set(projectId).then(function() {
                    //Notify user that it was successful
                    Notify.success('Project activated');
                    //Redirect user to overview (overview should be first page the user sees, also removes the need to update current view)
                    if ($location.path() === '/project/set') {
                        $location.path('/project');
                    } else {
                        $location.path('/overview');
                    }
                });
            },
            //Set current user
            setCurrentUser: function(fbUser) {
                //Create user object on rootscope
                $rootScope.currentUser = {
                    email: fbUser.email,
                    uid: fbUser.uid,
                    md5Hash: fbUser.md5_hash,
                    pid: localStorage.pid || undefined,
                    sid: localStorage.sid || undefined
                };

                //Fetch projectId (active project)
                User.getProjectId(fbUser.uid).then(function(pid) {
                    //If projectId is found
                    if (pid) {
                        //Save pid on user object and localstorage
                        $rootScope.currentUser.pid = pid;
                        localStorage.pid = pid;

                        //Fetch current sprintId
                        Sprint.getCurrent(pid).then(function(sid) {
                            //If sprintId is found
                            if (sid) {
                                //Save sprintId on user object and localstorage
                                $rootScope.currentUser.sid = sid;
                                localStorage.sid = sid;
                            }
                        });
                    }
                });
            },
            //Update project
            update: function(uid, user) {
                return users.$child(uid).$update(user);
            },
            //Start task (start working on task)
            startTask: function(projectId, sprintId, userId, taskId, task) {
                //Put userId and status on task
                task.userId = userId;
                task.status = 'In Progress';
                Task.setStatus(projectId, sprintId, taskId, task, task.status);
                //Set task as active task
                return users.$child(userId).$child(projectId).$child('task').$set(task);
            },
            //Get task
            getTask: function(projectId, userId) {
                return users.$child(userId).$child(projectId).$child('task');
            },
            //Stop task (quit working on task, putting it back in sprint backlog)
            stopTask: function(projectId, sprintId, userId, taskId, task) {
                //If task has userId, remove it
                if (task.userId) {
                    delete task.userId;
                }
                //Update status to not started
                Task.setStatus(projectId, sprintId, taskId, task, 'Not Started');
                //Remove task from active task
                return users.$child(userId).$child(projectId).$remove('task');
            },
            //Finish task (mark task as completed)
            finnishTask: function(projectId, sprintId, userId, taskId, task) {
                //If task has userId, remove
                if (task.userId) {
                    delete task.userId;
                }
                //Set status to completed
                Task.setStatus(projectId, sprintId, taskId, task, 'Completed');
                //Remove task from user
                return users.$child(userId).$child(projectId).$remove('task');
            },
            //Positive vote (used by projectservice)
            voteUp: function(userId, ideaId) {
                //Add positive vote
                users.$child(userId).$child('ideas').$child('up').$child(ideaId);
                //Remove negative vote
                users.$child(userId).$child('ideas').$child('down').$remove(ideaId);
            },
            //Negative vote
            voteDown: function(userId, ideaId) {
                //Add negative vote
                users.$child(userId).$child('ideas').$child('down').$child(ideaId);
                //Remove positive vote
                users.$child(userId).$child('ideas').$child('up').$remove(ideaId);
            }
        };

    //Create user object on login
    $rootScope.$on('$firebaseSimpleLogin:login', function(e, fbUser) {
        User.setCurrentUser(fbUser);
    });

    //Delete user object on logout
    $rootScope.$on('firebaseSimpleLogin:logout', function() {
        delete $rootScope.currentUser;
    });

    return User;
});