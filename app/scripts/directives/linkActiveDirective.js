/*
    Directive: linkActive
    Description: Compares href with current url, manages css class to enable styling
*/

angular.module('projiApp')

.directive('linkActive', function($location) {
    'use strict';
    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs) {
            //Set value of activeClass
            var activeClass = 'pure-menu-selected',
                href = iAttrs.href;

            //remove first char (so it works the same as $location.path())
            href = href.substr(1);

            $scope.$location = $location;

            //Watch for viewchange to update classes
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