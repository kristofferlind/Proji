angular.module('projiApp')

.directive('contenteditable', function() {
    'use strict';
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function(scope, iElm, iAttrs, ngModel) {
            //http://docs.angularjs.org/api/ng/type/ngModel.NgModelController

            //Skriv ut modellens värde i elementet
            ngModel.$render = function() {
                iElm.html(ngModel.$viewValue);
            };

            //Spara ngModel vid ändring
            iElm.on('blur keyup change', function() {
                scope.$apply(ngModel.$setViewValue(iElm.html()));
            });

            //Hur kan jag göra det här till en generell funktion som uppdaterar rätt värde i databasen? 
            //Används bindningen för 3-vägs bindning i controllern fungerar det, men det leder till lite onödiga kontroller?
            //Kanske inte är genomförbart, bättre med en mer traditionell lösning?
        }
    };
});