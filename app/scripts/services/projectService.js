angular.module('projiApp')

.factory('Project', function($firebase, FBURL, User, $rootScope, $q, $timeout, Notify) {
    'use strict';
    var ref = new Firebase(FBURL + '/projects'),
        ref2 = new Firebase(FBURL + '/users'),
        projects = $firebase(ref),
        users = $firebase(ref2),
        Project = {
            addUser: function(projectId, email) {
                //old stuff
                // User.addProject(projectId, userId);
                // projects.$child(projectId).$child('users').$add(userId);


                //which way is better?
                /* 
                Find user id by email
                    get all users
                    check email for each
                    grab user with matching email
                add user id to projects
                add project id to user

                if user is not found by email
                now: just say user does not exist

                later:
                    ask if we should invite
                    invite (send email via postmark api)
                        link to adduserregistration which will then add
                        or
                        check for email in projects on register? 
                 */


                var userId,
                    usersRef = new Firebase(FBURL + '/users/');

                usersRef.once('value', function(users) {
                    users.forEach(function(user) {
                        if (user.child('email').val() === email) {
                            userId = user.name();
                            User.addProject(projectId, userId);
                            // projects.$child(projectId).$child('users').$add(userId);
                            projects.$child(projectId).$child('users').$child(userId).$set(email).then(function() {
                                Notify.success('User added');
                            });
                        }
                    });
                    if (userId === undefined) {
                        Notify.error('User doesn\'t exist');
                    }
                });


            },
            all: function() {
                var userId = $rootScope.currentUser.uid,
                    projects = [],
                    usersRef = new Firebase(FBURL + '/users/' + userId + '/projects');

                var d = $q.defer();

                //Is it possible to solve this using angularfire? ($on loaded)
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
            create: function(userId, email, project) {
                projects.$add(project).then(function(data) {
                    var projectId = data.name();

                    projects.$child(projectId).$child('users').$child(userId).$set(email).then(function() {
                        Notify.success('Project created');
                        User.addProject(projectId, userId);
                        User.setCurrentProject(userId, projectId);
                    });

                });
            },
            delete: function(userId, projectId) {
                users.$child(userId).$child('projects').$remove(projectId);
                projects.$remove(projectId);
                //TODO remove for all users
            },
            find: function(projectId) {
                if (projectId !== undefined) {
                    return projects.$child(projectId);
                } else {
                    return 'no active project';
                }
            },
            getCurrent: function() {
                return projects.$child(User.getCurrentProject());
            },
            getUsers: function(projectId) {
                return projects.$child(projectId).$child('users');
            },
            removeUser: function(projectId, userId) {
                return projects.$child(projectId).$child('users').$remove(userId);
            },
            update: function(projectId, project) {
                return projects.$child(projectId).$set(project);
            }
        };

    return Project;
});