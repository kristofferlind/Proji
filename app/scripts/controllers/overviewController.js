angular.module('projiApp')

.controller('OverviewController', function($scope, $rootScope, Project, Idea, Task, Sprint, User) {
    'use strict';
    //----
    User.getUserId().then(function(userId) {
        User.getProjectId(userId).then(function(projectId) {
            //------


            $scope.project = Project.find(projectId);
            $scope.ideas = Idea.all(projectId);
            $scope.tasks = Task.all(projectId);

            Sprint.getCurrent(projectId).then(function(sprintId) {
                $scope.sprint = Sprint.find(projectId, sprintId);
            });

            $scope.voteUp = function(ideaId) {
                Idea.voteUp(projectId, ideaId, userId);
            };
            $scope.voteDown = function(ideaId) {
                Idea.voteDown(projectId, ideaId, userId);
            };


            //--------
        });
    });
    //----
});