angular.module('projiApp')

.filter('lineBreak', function() {
    'use strict';
    return function(input) {
        if (input === undefined) {
            return;
        }
        return input.replace(/&#10;/g, '<br />');
        // return input.replace('\n', '<br />');
    };
});