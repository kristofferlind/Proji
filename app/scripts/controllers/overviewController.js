/*
    Controller for Overview
    view: /
*/

angular.module('projiApp')

.controller('OverviewController', function($scope, $rootScope, Project, Idea, Task, Sprint) {
    'use strict';

    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid;

    //Initialization
    $scope.project = Project.find(projectId);
    $scope.ideas = Idea.all(projectId);
    $scope.tasks = Task.all(projectId);
    $scope.newTask = {};
    $scope.newIdea = {};
    $scope.showAddIdea = false;
    $scope.showAddTask = false;

    //Fetch current sprintId (figures out which one is active based on date)
    Sprint.getCurrent(projectId).then(function(sprintId) {
        //Fetch sprint data by sprintId
        $scope.sprint = Sprint.find(projectId, sprintId);
    });

    //Put a positive vote on idea
    $scope.voteUp = function(ideaId) {
        Idea.voteUp(projectId, ideaId, userId);
    };

    //Put a negative vote on idea
    $scope.voteDown = function(ideaId) {
        Idea.voteDown(projectId, ideaId, userId);
    };

    //Create a task
    $scope.createTask = function() {
        Task.create(projectId, $scope.newTask);
        $scope.newTask = {}; //clear task
        $scope.showAddTask = false; //remove modal
    };

    //Create idea
    $scope.addIdea = function() {
        $scope.newIdea.score = 0; //set initial score to 0 (should be in service)
        Idea.create(projectId, $scope.newIdea);
        $scope.newIdea = {}; //clear idea
        $scope.showAddIdea = false; //remove modal
    };
});