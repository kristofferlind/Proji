angular.module('projiApp')

.controller('OverviewController', function($scope, $rootScope, Project, Idea, Task, Sprint) {
    'use strict';

    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid;

    $scope.project = Project.find(projectId);
    $scope.ideas = Idea.all(projectId);
    $scope.tasks = Task.all(projectId);

    $scope.showAddIdea = false;

    Sprint.getCurrent(projectId).then(function(sprintId) {
        $scope.sprint = Sprint.find(projectId, sprintId);
    });

    $scope.voteUp = function(ideaId) {
        Idea.voteUp(projectId, ideaId, userId);
    };
    $scope.voteDown = function(ideaId) {
        Idea.voteDown(projectId, ideaId, userId);
    };


    $scope.newIdea = {};

    $scope.addIdea = function() {
        $scope.newIdea.score = 0;
        Idea.create(projectId, $scope.newIdea);
        $scope.newIdea = {};
        $scope.showAddIdea = false;
    };
});