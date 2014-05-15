angular.module('projiApp')

.directive('linkActive', function($location) {
    'use strict';
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs) {
            var activeClass = 'pure-menu-selected',
                href = iAttrs.href;

            href = href.substr(1);

            $scope.$location = $location;

            $scope.$watch('$location.path()', function(url) {
                if (href === url) {
                    iElm.parent().addClass(activeClass);
                } else {
                    iElm.parent().removeClass(activeClass);
                }
            });
        }
    };
});