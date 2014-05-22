'use strict';

describe('View: /task', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('#/task/');
    });

    afterEach(function() {
        browser.ignoreSynchronization = false;
    });

    // describe('Feature: Sprint backlog', function() {

    //     it('should be set current task on drag to dropzone');

    // });

    // describe('Feature: My task', function() {

    //     it('should set task to done when task dragged to done');

    //     it('should remove task from my task when dragged to sprint backlog');
    // });
});