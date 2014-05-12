angular.module('projiApp')

.directive('dialogConfirm', function() {
    'use strict';
    // Runs during compile
    return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        controller: function($scope, $element, $attrs, $rootScope) {
            var message = $attrs.dialogMessage || 'Are you sure?',
                dialog = {};

            dialog.message = message;

            $element.bind('click', function() {
                // var message = $attrs.confirmMessage || 'Are you sure?';
                $rootScope.$broadcast('dialog-confirm', dialog);
                $rootScope.$on('dialog-confirmed', function() {
                    $scope.$eval($attrs.onConfirm);
                });
            });
        },
        // link: function(scope, iElm, iAttrs) {
        //     var message = iAttrs.confirmMessage || 'Are you sure?';

        //     iElm.bind('click', function() {
        //         var confirmed = window.confirm(message);
        //         if (confirmed) {
        //             scope.$eval(iAttrs.onConfirm);
        //         }
        //     });
        // }
    };
})

.directive('dialogShow', function() {
    'use strict';
    // Runs during compile
    return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'views/partials/dialog.html',
        replace: true,
        controller: function($scope, $rootScope) {
            $scope.close = function(dialog) {
                var index = $scope.dialogs.indexOf(dialog);
                if (index > -1) {
                    $scope.dialogs.splice(index, 1);
                }
            };

            $scope.dialogs = [];

            var addDialog = function(dialog) {
                $scope.$apply(function() {
                    $scope.dialogs.push(dialog);
                });
            };

            $scope.yes = function(dialog) {
                $rootScope.$broadcast('dialog-confirmed', dialog);
                $scope.close(dialog);
            };

            $rootScope.$on('dialog-confirm', function(event, dialog) {
                addDialog(dialog);
            });
        }
    };
});