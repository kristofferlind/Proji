var overviewView = function() {
    'use strict';

    var overviewView = {
        get: function() {
            browser.get('#');
            browser.waitForAngular();
        }
    };

    return overviewView;
};

module.exports = overviewView();