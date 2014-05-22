/*
    Service: Project
    Description: Manages project data on firebase
*/

angular.module('projiApp')

.factory('Project', function($firebase, FBURL, User, $rootScope, $q, $timeout, Notify) {
    'use strict';
    var ref = new Firebase(FBURL + '/projects'),
        ref2 = new Firebase(FBURL + '/users'),
        projects = $firebase(ref),
        users = $firebase(ref2),
        Project = {
            //Add user to project
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

                //Fetch users
                usersRef.once('value', function(users) {
                    //For each user
                    users.forEach(function(user) {
                        //If user.email === email
                        if (user.child('email').val() === email) {
                            userId = user.name();
                            //Add project to user
                            User.addProject(projectId, userId);
                            //set userId:email
                            projects.$child(projectId).$child('users').$child(userId).$set(email).then(function() {
                                //Show notification that the operation was successful
                                Notify.success('User added');
                            });
                        }
                    });
                    //If user with email wasn't found
                    if (userId === undefined) {
                        //Notify user that the operation failed
                        Notify.error('User doesn\'t exist');
                    }
                });


            },
            //Fetch all projects
            all: function() {
                var userId = $rootScope.currentUser.uid,
                    projects = [],
                    usersRef = new Firebase(FBURL + '/users/' + userId + '/projects');

                var d = $q.defer();

                //Get projects from current user
                usersRef.once('value', function(data) {
                    //For each project
                    data.forEach(function(projectId) {
                        //Fetch project data and push to projects array
                        projects.push(Project.find(projectId.val()));
                    });

                    //Resolve data
                    $timeout(function() {
                        d.resolve(projects);
                    });
                });

                return d.promise;
            },
            //Create project
            create: function(userId, email, project) {
                //Create project
                projects.$add(project).then(function(data) {
                    var projectId = data.name();

                    //Add user to project
                    projects.$child(projectId).$child('users').$child(userId).$set(email).then(function() {
                        Notify.success('Project created');
                        //Add project to user
                        User.addProject(projectId, userId);
                        //Set project as active project for user
                        User.setCurrentProject(userId, projectId);
                    });

                });
            },
            //Delete project
            delete: function(userId, projectId) {
                var projectUsersRef = new Firebase(FBURL + '/projects/' + projectId + '/users');

                //Fetch user data from project
                projectUsersRef.once('value', function(userData) {
                    //For each user..
                    userData.forEach(function(user) {
                        //Remove user from project
                        Project.removeUser(projectId, user.name());
                    });

                    //Remove project
                    projects.$remove(projectId);

                    //Remove project from user
                    return users.$child(userId).$child('projects').$remove(projectId);
                });
            },
            //Find project
            find: function(projectId) {
                //If projectId was supplied
                if (projectId !== undefined) {
                    //Return project by id
                    return projects.$child(projectId);
                } else {
                    //Otherwise reply with no active project
                    return 'no active project';
                }
            },
            //Get current project
            getCurrent: function() {
                return projects.$child(User.getCurrentProject());
            },
            //Get users in project
            getUsers: function(projectId) {
                return projects.$child(projectId).$child('users');
            },
            //Remove user from project
            removeUser: function(projectId, userId) {
                users.$child(userId).$child('projects').$remove(projectId);
                return projects.$child(projectId).$child('users').$remove(userId);
            },
            //Update project
            update: function(projectId, project) {
                return projects.$child(projectId).$set(project);
            }
        };

    return Project;
});