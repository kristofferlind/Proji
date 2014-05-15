'use strict';

describe('View: /overview', function() {

    var overviewView = require('./overviewView.pom.js');

    // beforeEach(function() {
    //     overviewView.get();
    // });


    //TODO: put this in navtest
    // describe('Feature: Project info', function() {
    //     it('should show project name', function() {
    //         expect(element(by.binding('project.name')).getText()).toEqual('testProject');
    //     });
    //     it('should show project description', function() {
    //         expect(element(by.binding('project.description')).getText()).toEqual('Description: testDescription');
    //     });
    //     it('should show current sprint', function() {
    //         expect(element(by.binding('sprint.name')).getText()).toEqual('Sprint: testSprint (2014-01-01 - 2050-01-01)');
    //     });
    //     it('should show current sprint goal', function() {
    //         expect(element(by.binding('sprint.goal')).getText()).toEqual('Sprint goal: testGoal');
    //     });
    // });

    describe('Feature: Tasks', function() {

        it('should show 5 tasks', function() {
            overviewView.get();

            expect(overviewView.tasks.count()).toBe(5);
        });

        describe('Create Task', function() {

            it('should create task on success', function() {
                overviewView.createTask('testName', 'testDescription', 'tags');
                //expect..
            });
        });
    });

    describe('Feature: Ideas', function() {

        it('should show ideas', function() {
            expect(overviewView.ideas().count()).toBeGreaterThan(0);
        });

        it('should order ideas based on score', function() {
            expect(overviewView.ideaScore(1).getText()).not.toBeGreaterThan(overviewView.ideaScore(0).getText());
            expect(overviewView.ideaScore(2).getText()).not.toBeGreaterThan(overviewView.ideaScore(1).getText());
            expect(overviewView.ideaScore(3).getText()).not.toBeGreaterThan(overviewView.ideaScore(2).getText());
            expect(overviewView.ideaScore(4).getText()).not.toBeGreaterThan(overviewView.ideaScore(3).getText());
        });

        describe('voteUp', function() {

            it('should change score on voteUp', function() {
                overviewView.ideaVoteUp(0);
                expect(overviewView.ideaScore(0).getText()).toEqual('50');
            });

            it('should not make changes on second voteUp', function() {
                overviewView.ideaVoteUp(0);
                expect(overviewView.ideaScore(0).getText()).toEqual('50');
            });
        });

        describe('voteDown', function() {

            it('should change score on voteDown', function() {
                overviewView.ideaVoteDown(0);
                expect(overviewView.ideaScore(0).getText()).toEqual('48');
            });

            it('should not make changes on second voteDown', function() {
                overviewView.ideaVoteDown(0);
                expect(overviewView.ideaScore(0).getText()).toEqual('48');
            });
        });

        describe('addIdea', function() {

            it('should add an idea', function() {
                overviewView.createIdea('testName', 'testDescription');
                expect(overviewView.idea(1).findElement(by.css('.idea-item-body')).getText()).toEqual('testName - testDescription');
                overviewView.ideaVoteDown(1); //make sure tests work next time too..
            });
        });

        //This might get a bit heavy, is it useful ?
        describe('addComment', function() {
            it('should be possible');
        });
        describe('removeComment', function() {
            it('should be possible');
        });

    });
    describe('Feature: Events', function() {
        it('should be possible');
    });

});