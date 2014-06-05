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
        link: function(scope, iElm) {
            //Check if modal contains a form when shown
            scope.$watch('show', function() {
                if (scope.show === true) {
                    var element = iElm[0],
                        formInputFields = element.querySelectorAll('form input:first-of-type');

                    //Focus first input element if it is
                    if (formInputFields) {
                        formInputFields[0].focus();
                    }
                }
            });

            //Close modal
            scope.close = function() {
                scope.show = false;
            };
        }
    };
});