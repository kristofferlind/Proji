/*
    Directive: taskItem
    Description: Template and logic for task item
*/

angular.module('projiApp')

.directive('taskItem', function() {
    'use strict';
    // Runs during compile
    return {
        scope: {
            task: '=ngModel'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $rootScope, $attrs) {
            //Check that drag-type is pb, that sprintId exists on task and compare its sprintId with current sprintId
            if ($attrs.dragType === 'pb' && $scope.task.sprintId && $scope.task.sprintId === $rootScope.currentUser.sid) {
                //Set activeSprint to 'task-in-sprint', which is then added as a css class.
                //This class provides styling for task that is already in sprint backlog
                $scope.activeSprint = 'task-in-sprint';
            }
        },
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'views/partials/taskItem.html',
        transclude: true,
    };
});