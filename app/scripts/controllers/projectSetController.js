/*
    Controller for set project page (when no active project)
    view: /project/set
*/

angular.module('projiApp')

.controller('ProjectSetController', function($scope, $rootScope, User, Project) {
    'use strict';

    //Sometimes currentUser isn't done when this page loads
    //should use currentUser.uid and make sure uid is set on resolve instead
    User.getUserId().then(function(userId) {

        var email = $rootScope.currentUser.email;

        Project.all().then(function(data) {
            $scope.projects = data;
        });

        $scope.newProject = {};

        //Create project
        $scope.createProject = function() {
            Project.create(userId, email, $scope.newProject);
        };

        //Activate project
        $scope.setCurrentProject = function(projectId) {
            User.setCurrentProject(userId, projectId);
        };

        //Delete project
        $scope.deleteProject = function(projectId) {
            Project.delete(userId, projectId);
        };

        //Logic for opening modal
        $scope.editProject = function(projectId) {
            $scope.changeProject = Project.find(projectId);
            $scope.showEditProject = true; //show modal
        };

        //Update project
        $scope.updateProject = function() {
            Project.update($scope.editProject.$id, $scope.editProject);
            $scope.showEditProject = false; //remove modal
        };
    });
});