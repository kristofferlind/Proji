angular.module('projiApp')

.filter('toArray', function() {
    'use strict';
    return function(input) {
        if (!angular.isObject(input)) {
            return input;
        }

        var output = [];
        for (var key in input) {
            if (key.substr(0, 1) !== '$') {
                var item = input[key];
                item.Id = key;
                output.push(input[key]);
            }
        }

        return output;
    };
});