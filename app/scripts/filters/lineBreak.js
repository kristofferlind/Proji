/*
    Filter: lineBreak
    Description: Replace linky line-break to html line break. Should also replace \n to be reusable.
*/

angular.module('projiApp')

.filter('lineBreak', function() {
    'use strict';

    return function(input) {
        //Do nothing if input is undefined
        if (input === undefined) {
            return;
        }
        //Replace tokenized linebreak with html linebreak and return
        return input.replace(/&#10;/g, '<br />');
    };
});