angular.module('projiApp')

.filter('toCSSName', function() {
    'use strict';
    return function(input) {
        if (input === undefined) {
            return;
        }
        var output = input.toLowerCase();

        output = output.replace(' ', '-');

        return output;
    };
});