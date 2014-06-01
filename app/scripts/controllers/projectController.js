/*
    Controller for project page (plan project)
    view: /project
*/

angular.module('projiApp')

.controller('ProjectController', function($scope, $location, Project, User, $rootScope, Sprint) {
    'use strict';

    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid,
        email = $rootScope.currentUser.email,
        //Updates project list, need to update this manually due to bad design (also means it doesn't work for changes by other users)
        fetchProjects = function() {
            Project.all().then(function(data) {
                $scope.projects = data;
            });
        };

    //Initialization
    fetchProjects();
    $scope.project = Project.find(projectId);
    $scope.sprints = Sprint.all(projectId);
    $scope.editedSprint = {};
    $scope.newSprint = {};
    $scope.newProject = {};
    $scope.addUser = {};
    $scope.createProject = false;
    $scope.showEditProject = false;
    $scope.users = Project.getUsers(projectId);

    //Invite user
    $scope.inviteUser = function() {
        Project.addUser(projectId, $scope.addUser.email);
        $scope.showAddUser = false; //remove modal
        $scope.addUser = {};
    };

    //Remove user from project
    $scope.removeUser = function(userId) {
        Project.removeUser(projectId, userId);
    };

    /*
    Project
*/

    //Create project (weird name due to bad naming for showing the modal)
    $scope.makeProject = function() {
        Project.create(userId, email, $scope.newProject);
        $scope.createProject = false; //I'm pretty sure this is no longer in use..
        $scope.showAddProject = false; //Remove modal
    };

    //Activate project
    $scope.setCurrentProject = function(projectId) {
        User.setCurrentProject(userId, projectId);
    };

    //Logic for showing modal to edit project
    $scope.editProject = function(projectId) {
        $scope.editedProject = Project.find(projectId); //Fetch project data
        $scope.showEditProject = true; //Show modal
    };

    //Update project
    $scope.updateProject = function() {
        Project.update($scope.editedProject.$id, $scope.editedProject);
        $scope.showEditProject = false; //Remove modal
    };

    //Delete project
    $scope.deleteProject = function(projectId) {
        Project.delete(userId, projectId);
        fetchProjects(); //Update projectlist
    };

    /*
    Sprint
*/

    //Create sprint
    $scope.createSprint = function() {
        Sprint.create(projectId, $scope.newSprint);
        $scope.newSprint = {}; //Clear saved data
        $scope.showAddSprint = false; //Remove modal 
    };

    //Logic for showing modal to edit sprint
    $scope.editSprint = function(sprintId) {
        $scope.editedSprint = Sprint.find(projectId, sprintId); //Fetch sprint data
        $scope.sprintId = sprintId; //Putting this on scope isn't really needed
        $scope.showEditSprint = true; //Show modal
    };

    //Update sprint
    $scope.updateSprint = function() {
        Sprint.update(projectId, $scope.sprintId, $scope.editedSprint);
        $scope.showEditSprint = false; //Remove modal
    };

    //Delete sprint
    $scope.deleteSprint = function(sprintId) {
        Sprint.delete(projectId, sprintId);
    };

    //I dont think this is even used..
    $scope.hideEditSprint = function() {
        $scope.viewEditSprint = false;
    };
});