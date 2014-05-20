'use strict';

describe('View: /sprint', function() {
    var sprintView = require('./sprintView.pom.js');

    // browser.get('#/sprint');
    // browser.sleep(2000);

    //testing..
    // it('DEBUG: login only', function() {
    //     var loginView = require('./loginView.pom.js');
    //     loginView.get();
    //     loginView.login('test@example.com', 'Password!', true);
    // });

    beforeEach(function() {
        sprintView.get();
    });

    describe('Feature: Tasks', function() {

        describe('Create task', function() {

            it('should create task on success', function() {
                // sprintView.get();
                sprintView.createTask('testName', 'testDescription', 'e2eTestTag', 1, 1);
                expect(sprintView.pbTasks.last().getText()).toEqual('1\ntestName - testDescription');
            });
        });

        describe('Edit task', function() {

            it('should update task on success', function() {
                sprintView.editLastTask('testName2', 'testDescription2', 'e2eTestTag', 1, 1);
                expect(sprintView.pbTasks.last().getText()).toEqual('1\ntestName2 - testDescription2');
            });
        });
        describe('Delete task', function() {

            it('should delete task on success', function() {
                sprintView.deleteLastTask();
                expect(sprintView.pbTasks.last().getText()).not.toEqual('1\ntestName2 - testDescription2');
            });
        });
    });

    //drag & drop testing is really buggy, skip testing this for now..
    describe('Feature: Backlogs', function() {

        it('should put task in sprint backlog on drag from product to sprint backlog');

        it('should put task in product backlog on drag from sprint to product backlog');
    });
});