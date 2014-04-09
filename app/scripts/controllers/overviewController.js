angular.module('projiApp')

.controller('OverviewController', function($scope, $rootScope, Project, Idea, Task, Sprint) {
    'use strict';

    var user = $rootScope.currentUser,
        userId = user.uid,
        projectId = user.pid;
    // sprintId = Sprint.getCurrent(projectId);

    $scope.project = Project.find(projectId);
    $scope.ideas = Idea.all(projectId);
    $scope.tasks = Task.all(projectId);
    // $scope.sprint = Sprint.find(projectId, sprintId);

    Sprint.getCurrent(projectId).then(function(sprintId) {
        $scope.sprint = Sprint.find(projectId, sprintId);
    });

    $scope.voteUp = function(ideaId) {
        Idea.voteUp(projectId, ideaId, userId);
    };
    $scope.voteDown = function(ideaId) {
        Idea.voteDown(projectId, ideaId, userId);
    };
});