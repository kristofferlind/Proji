angular.module('projiApp')

.filter('toArray', function() {
    'use strict';
    return function(input) {
        var isNumber = function(number) {
            return !isNaN(parseFloat(number)) && isFinite(number);
        };

        if (!angular.isObject(input)) {
            return input;
        }

        var output = [];
        for (var key in input) {
            if (key.substr(0, 1) !== '$') {
                var item = input[key];
                item.Id = key;

                for (var prop in item) {
                    var subItem = item[prop];
                    if (isNumber(subItem)) {
                        subItem = parseInt(subItem);
                        item[prop] = subItem;
                    }
                }

                output.push(item);
            }
        }
        return output;
    };
});