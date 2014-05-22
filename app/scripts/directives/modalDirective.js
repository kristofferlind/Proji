/*
    Directive: modal
    Description: Show modal
*/

angular.module('projiApp')

.directive('modal', function() {
    'use strict';
    // Runs during compile
    return {
        scope: {
            show: '='
        }, // {} = isolate, true = child, false/undefined = no change
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'views/partials/modal.html',
        replace: true,
        transclude: true,
        link: function(scope) {
            //Close modal
            scope.close = function() {
                scope.show = false;
            };
        }
    };
});