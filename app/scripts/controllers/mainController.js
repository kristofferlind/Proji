'use strict';

angular.module('projiApp')

.controller('MainController', function($scope, Project) {
    if (Project.anyCurrent) {
        var projectId = Project.getCurrent();
        $scope.project = Project.find(projectId);
    }
});