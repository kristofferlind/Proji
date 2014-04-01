'use strict';

angular.module('projiApp')

.controller('ProjectController', function($scope, $location, Project) {
    $scope.projects = Project.all;
    $scope.project = {
        name: '',
        description: ''
    };

    $scope.createProject = function() {
        Project.create($scope.project).then(function(ref) {
            $location.path('/project/' + ref.name());
        });
    };

    $scope.deleteProject = function(projectId) {
        Project.delete(projectId);
    };
});