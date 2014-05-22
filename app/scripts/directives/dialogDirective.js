/*
    Directive: dialogConfirm
    Description: Tell dialogShow to display dialog. Run onConfirm function on yes
    Might need to set a guid for dialog, though there should never be more than one at a time..
*/

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

            //Execute on click
            $element.bind('click', function() {
                //Tell dialogShow to display dialog
                $rootScope.$broadcast('dialog-confirm', dialog);
                //Listen for confirm (yes)
                $rootScope.$on('dialog-confirmed', function() {
                    $scope.$eval($attrs.onConfirm);
                });
            });
        },
    };
});

/*
    Directive: 
    Description: 
*/

angular.module('projiApp')

.directive('dialogShow', function() {
    'use strict';
    // Runs during compile
    return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'views/partials/dialog.html',
        replace: true,
        controller: function($scope, $rootScope) {
            //Close dialog
            $scope.close = function(dialog) {
                //Find index of dialog
                var index = $scope.dialogs.indexOf(dialog);
                if (index > -1) {
                    $scope.dialogs.splice(index, 1); //Remove dialog
                }
            };

            $scope.dialogs = [];

            //Add dialog
            var addDialog = function(dialog) {
                $scope.$apply(function() {
                    $scope.dialogs.push(dialog);
                });
            };

            //Confirm dialog, sends event to run onConfirm function
            $scope.yes = function(dialog) {
                $rootScope.$broadcast('dialog-confirmed', dialog);
                $scope.close(dialog); //Close dialog
            };

            //Listen for requests to add dialog
            $rootScope.$on('dialog-confirm', function(event, dialog) {
                addDialog(dialog); //Add dialog
            });
        }
    };
});