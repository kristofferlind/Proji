angular.module('projiApp')

.directive('sprintItem', function() {
    'use strict';
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            sprint: '=ngModel'
        }, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'views/partials/sprintItem.html',
        replace: true,
        transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope) {
            var status,
                sprint = $scope.sprint,
                start = new Date(sprint.start),
                end = new Date(sprint.end),
                now = new Date().getTime();

            start.setHours(0);
            start.setMinutes(0);
            end.setHours(23);
            end.setMinutes(59);

            start = start.getTime();
            end = end.getTime();

            if (now > end) {
                status = 'completed';
            }
            if (now > start && now < end) {
                status = 'in-progress';
            }
            if (now < start) {
                status = 'not-started';
            }

            $scope.sprint.status = status;
        }
    };
});