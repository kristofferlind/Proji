angular.module('projiApp')

.factory('Notify', function($rootScope) {
    'use strict';
    var notificationMessage = function(type, text) {
        var message = {
            type: type,
            text: text
        };

        $rootScope.$broadcast('NotificationMessage', message);
    },
        Notify = {
            error: function(text) {
                notificationMessage('error', text);
            },
            info: function(text) {
                notificationMessage('info', text);
            },
            success: function(text) {
                notificationMessage('success', text);
            },
            warning: function(text) {
                notificationMessage('warning', text);
            },
        };

    return Notify;
});