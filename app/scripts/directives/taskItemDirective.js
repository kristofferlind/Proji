angular.module('projiApp')

.directive('taskItem', function() {
    'use strict';
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            //taskId: '=taskId',
            task: '=ngModel'
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $rootScope, $attrs) {
            if ($attrs.dragType === 'pb' && $scope.task.sprintId && $scope.task.sprintId === $rootScope.currentUser.sid) {
                $scope.activeSprint = 'task-in-sprint';
            }
        },
        // require: '?ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        //template: '<h4>test</h4>',
        templateUrl: 'views/partials/taskItem.html',
        // replace: true,
        transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        //link: function(scope, iElm, iAttrs, ngModel) {}
    };
});