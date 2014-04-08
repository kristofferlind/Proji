angular.module('projiApp')

.controller('IdeaController', function($scope, Idea, $rootScope) {
    'use strict';
    var projectId = $rootScope.currentUser.pid;

    $scope.ideas = Idea.all(projectId);
    $scope.idea = {};

    $scope.addIdea = function() {
        Idea.create(projectId, $scope.idea);
        $scope.idea = {};
    };
    $scope.deleteIdea = function(ideaId) {
        Idea.delete(projectId, ideaId);
    };
});