angular.module('projiApp')

.directive('notify', function() {
    'use strict';
    return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'views/partials/notify.html',
        replace: true,
        transclude: true,
        controller: function($scope, $timeout, $rootScope) {
            var addNotification = function(notification) {
                var ttl = 1000 + notification.text.length * 45;
                $scope.notifications.push(notification);
                $timeout(function() {
                    $scope.deleteNotification(notification);
                }, ttl);
            };

            $scope.notifications = [];

            $scope.deleteNotification = function(notification) {
                var index = $scope.notifications.indexOf(notification);
                if (index > -1) {
                    $scope.notifications.splice(index, 1);
                }
            };

            $rootScope.$on('NotificationMessage', function(event, notification) {
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        addNotification(notification);
                    });
                } else {
                    addNotification(notification);
                }
            });
        },
    };
});