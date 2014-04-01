'use strict';

angular.module('projiApp')

.controller('ProjectDetailsController', function($scope, $routeParams, Project, Sprint) {
    var projectId = $routeParams.projectId;
    $scope.project = Project.find(projectId);
    $scope.sprints = Sprint.all(projectId);
    $scope.sprint = {};

    $scope.createSprint = function() {
        Sprint.create(projectId, $scope.sprint).then(function() {
            $scope.sprint = {};
        });
    };
    $scope.deleteSprint = function(sprintId) {
        Sprint.delete(projectId, sprintId);
    };
});