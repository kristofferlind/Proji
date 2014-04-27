'use strict';

describe('View: /overview', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('#');
        // browser.sleep(1000);
    });

    afterEach(function() {
        browser.ignoreSynchronization = false;
    });

    describe('Feature: Project info', function() {
        it('should show project name', function() {
            expect(element(by.binding('project.name')).getText()).toEqual('testProject');
        });
        it('should show project description', function() {
            expect(element(by.binding('project.description')).getText()).toEqual('Description: testDescription');
        });
        it('should show current sprint', function() {
            expect(element(by.binding('sprint.name')).getText()).toEqual('Sprint: testSprint (2014-01-01 - 2050-01-01)');
        });
        it('should show current sprint goal', function() {
            expect(element(by.binding('sprint.goal')).getText()).toEqual('Sprint goal: testGoal');
        });
    });
    describe('Feature: Tasks', function() {
        it('should show 5 tasks', function() {
            element.all(by.css('task-item')).count();
        });
        it('should order tasks based on priority', function() {
            element.all(by.css('.task-item-priority')).then(function(tasks) {
                expect(tasks[0].getText()).not.toBeGreaterThan(tasks[1].getText());
                expect(tasks[1].getText()).not.toBeGreaterThan(tasks[2].getText());
                expect(tasks[2].getText()).not.toBeGreaterThan(tasks[3].getText());
                expect(tasks[3].getText()).not.toBeGreaterThan(tasks[4].getText());
            });
        });
    });
    describe('Feature: Ideas', function() {
        it('should show ideas', function() {
            element.all(by.css('idea-item')).count();
        });
        it('should order ideas based on score', function() {
            element.all(by.css('.idea-item-score')).then(function(ideas) {
                expect(ideas[0].getText()).not.toBeGreaterThan(ideas[1].getText());
                expect(ideas[1].getText()).not.toBeGreaterThan(ideas[2].getText());
                expect(ideas[2].getText()).not.toBeGreaterThan(ideas[3].getText());
                expect(ideas[3].getText()).not.toBeGreaterThan(ideas[4].getText());
            });
        });

        describe('voteUp', function() {
            it('should change score on voteUp', function() {
                var oldIdeaScores = element.all(by.css('.idea-item-score')),
                    oldVoteUps = element.all(by.css('.idea-item-voting-up')),
                    oldScore = oldIdeaScores[1].getText();

                oldVoteUps[1].click();

                expect(oldIdeaScores[1].getText()).toEqual(oldScore + 1);
            });

            it('should not make changes on second voteUp', function() {
                var oldIdeaScores = element.all(by.css('.idea-item-score')),
                    oldVoteUps = element.all(by.css('.idea-item-voting-up')),
                    oldScore = oldIdeaScores[1].getText();

                oldVoteUps[1].click();

                expect(oldIdeaScores[1].getText()).toEqual(oldScore);
            });
        });

        describe('voteDown', function() {
            it('should change score on voteDown', function() {
                var oldIdeaScores = element.all(by.css('.idea-item-score')),
                    oldVoteDowns = element.all(by.css('.idea-item-voting-down')),
                    oldScore = oldIdeaScores[1].getText();

                oldVoteDowns[1].click();

                expect(oldIdeaScores[1].getText()).toEqual(oldScore + 1);
            });

            it('should not make changes on second voteDown', function() {
                var oldIdeaScores = element.all(by.css('.idea-item-score')),
                    oldVoteDowns = element.all(by.css('.idea-item-voting-down')),
                    oldScore = oldIdeaScores[1].getText();

                oldVoteDowns[1].click();

                expect(oldIdeaScores[1].getText()).toEqual(oldScore);
            });
        });

        describe('addIdea', function() {
            it('should show modal when requested');

            it('should remove modal when done');

            it('should show new idea when done');
        });

        //This might get a bit heavy, is it useful?
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