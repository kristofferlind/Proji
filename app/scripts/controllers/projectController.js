angular.module('projiApp')

.controller('ProjectController', function($scope, $location, Project, User, $rootScope) {
    'use strict';

    var user = $rootScope.currentUser;

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

    $scope.setCurrentProject = function(projectId) {
        User.setCurrentProject(user.uid, projectId);
    };

    $scope.deleteProject = function(projectId) {
        Project.delete(projectId);
    };
});