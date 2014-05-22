/*
    Directive: contenteditable
    Description: extends contenteditable so that it actually saves its changes on model
*/

angular.module('projiApp')

.directive('contenteditable', function() {
    'use strict';
    // Runs during compile
    return {
        require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function(scope, iElm, iAttrs, ngModel) {
            //http://docs.angularjs.org/api/ng/type/ngModel.NgModelController

            //Render the value of ngModel in the element on $render
            ngModel.$render = function() {
                iElm.html(ngModel.$viewValue);
            };

            //Save ngModel on change
            iElm.on('blur keyup change', function() {
                scope.$apply(ngModel.$setViewValue(iElm.html()));
            });
        }
    };
});