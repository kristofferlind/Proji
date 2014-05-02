'use strict';

describe('View: /overview', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('#');
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
            expect(element.all(by.css('.task-item')).count()).toBeGreaterThan(0);
        });
        it('should order tasks based on priority', function() {
            element.all(by.css('.task-item-priority')).then(function(tasks) {
                expect(tasks[4].getText()).not.toBeGreaterThan(tasks[3].getText());
                expect(tasks[3].getText()).not.toBeGreaterThan(tasks[2].getText());
                expect(tasks[2].getText()).not.toBeGreaterThan(tasks[1].getText());
                expect(tasks[1].getText()).not.toBeGreaterThan(tasks[0].getText());
            });
        });
    });
    describe('Feature: Ideas', function() {

        it('should show ideas', function() {
            element.all(by.css('.idea-item')).then(function(ideas) {
                expect(ideas.length).toBeGreaterThan(0);
            });
        });

        it('should order ideas based on score', function() {
            element.all(by.css('.idea-item-score')).then(function(ideas) {
                expect(ideas[4].getText()).not.toBeGreaterThan(ideas[3].getText());
                expect(ideas[3].getText()).not.toBeGreaterThan(ideas[2].getText());
                expect(ideas[2].getText()).not.toBeGreaterThan(ideas[1].getText());
                expect(ideas[1].getText()).not.toBeGreaterThan(ideas[0].getText());
            });
        });

        describe('voteUp', function() {
            it('should change score on voteUp', function() {
                var oldScore, newScore,
                    validate = function() {
                        browser.sleep(1000);
                        element.all(by.css('.idea-item-score')).then(function(scores) {
                            scores[0].getText().then(function(score) {
                                newScore = parseInt(score);
                                expect(newScore).toEqual(oldScore + 2);
                            });
                        });
                    };

                element.all(by.css('.idea-item-score')).then(function(scores) {
                    element.all(by.css('.idea-item-voting-up')).then(function(voting) {
                        scores[0].getText().then(function(score) {
                            oldScore = parseInt(score);
                            voting[0].click();
                            validate();
                        });
                    });
                });
            });

            it('should not make changes on second voteUp', function() {
                var oldScore, newScore,
                    validate = function() {
                        browser.sleep(1000);
                        element.all(by.css('.idea-item-score')).then(function(scores) {
                            scores[0].getText().then(function(score) {
                                newScore = parseInt(score);
                                expect(newScore).toEqual(oldScore);
                            });
                        });
                    };

                element.all(by.css('.idea-item-score')).then(function(scores) {
                    element.all(by.css('.idea-item-voting-up')).then(function(voting) {
                        scores[0].getText().then(function(score) {
                            oldScore = parseInt(score);
                            voting[0].click();
                            validate();
                        });
                    });
                });
            });
        });

        describe('voteDown', function() {
            it('should change score on voteDown', function() {

                var oldScore, newScore,
                    validate = function() {
                        browser.sleep(1000);
                        element.all(by.css('.idea-item-score')).then(function(scores) {
                            scores[0].getText().then(function(score) {
                                newScore = parseInt(score);
                                expect(newScore).toEqual(oldScore - 2);
                            });
                        });
                    };

                element.all(by.css('.idea-item-score')).then(function(scores) {
                    element.all(by.css('.idea-item-voting-down')).then(function(voting) {
                        scores[0].getText().then(function(score) {
                            if (!oldScore) {
                                oldScore = parseInt(score);
                            }
                            voting[0].click();
                            validate();
                        });
                    });
                });
            });

            it('should not make changes on second voteDown', function() {

                var oldScore, newScore,
                    validate = function() {
                        browser.sleep(1000);
                        element.all(by.css('.idea-item-score')).then(function(scores) {
                            scores[0].getText().then(function(score) {
                                newScore = parseInt(score);
                                expect(newScore).toEqual(oldScore);
                            });
                        });
                    };

                element.all(by.css('.idea-item-score')).then(function(scores) {
                    element.all(by.css('.idea-item-voting-down')).then(function(voting) {
                        scores[0].getText().then(function(score) {
                            if (!oldScore) {
                                oldScore = parseInt(score);
                            }
                            voting[0].click();
                            validate();
                        });
                    });
                });
            });
        });

        describe('addIdea', function() {

            it('should add an idea', function() {
                var ideaName = 'test' + Math.floor(Math.random() * 1001),
                    ideaAdded = false,
                    validate = function() {
                        expect(ideaAdded).toBe(true);
                    };

                element(by.css('.idea-add')).click();
                element(by.model('newIdea.name')).sendKeys(ideaName);
                element(by.css('.ideas .pure-button-primary')).click();

                element.all(by.css('.idea-item-body')).then(function(ideas) {
                    for (var i = ideas.length - 1; i >= 0; i--) {
                        ideas[i].getText().then(function(name) {
                            if (name === ideaName + ' -') {
                                ideaAdded = true;
                            }
                            if (i === 0) {
                                validate();
                            }
                        })
                    }
                });
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