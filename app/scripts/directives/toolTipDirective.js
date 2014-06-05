angular.module('projiApp')

.directive('toolTip', function($compile, $timeout) {
    'use strict';
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs) {
            var tooltip, toShow, message = iAttrs.toolTip,
                tooltipHTML = '<div class="tooltip"><p>' + message + '</p></div>',
                show = function() {
                    tooltip = angular.element(tooltipHTML);
                    iElm.after(tooltip);

                    $compile(tooltip)($scope);
                    $scope.$digest();
                },
                hide = function() {
                    if (tooltip) {
                        tooltip.remove();
                    }
                };

            iElm.bind('mouseenter', function() {
                hide();
                toShow = $timeout(show, 300);
            });

            iElm.bind('mouseleave', function() {
                hide();
                $timeout.cancel(toShow);
            });
        }
    };
});