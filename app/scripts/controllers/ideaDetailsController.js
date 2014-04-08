angular.module('projiApp')

.controller('IdeaDetailsController', function($scope, $rootScope, Idea, $routeParams) {
    'use strict';

    var projectId = $rootScope.currentUser.pid,
        userId = $rootScope.currentUser.uid,
        ideaId = $routeParams.ideaId;

    $scope.idea = Idea.find(projectId, ideaId);

    $scope.comments = Idea.getComments(projectId, ideaId);
    $scope.comment = {};


    $scope.addComment = function() {
        Idea.addComment(projectId, ideaId, $scope.comment);
        $scope.comment = {};
    };

    $scope.removeComment = function(commentId) {
        Idea.removeComment(projectId, ideaId, commentId);
    };

    $scope.voteUp = function() {
        Idea.voteUp(projectId, ideaId, userId);
    };

    $scope.voteDown = function() {
        Idea.voteDown(projectId, ideaId, userId);
    };
});