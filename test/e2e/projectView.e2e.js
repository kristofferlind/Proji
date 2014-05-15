'use strict';

describe('View: /project', function() {

    var projectView = require('./projectView.pom.js');

    // projectView.get();
    beforeEach(function() {
        projectView.get();
    });

    describe('Feature: Users', function() {
        var email = 'test172@test.com';

        describe('Add user', function() {

            it('should add a user on success', function() {
                projectView.get();
                projectView.addUser(email);
                expect(projectView.userEmail(2).getText()).toEqual(email);
            });

        });

        describe('Remove user', function() {

            it('should remove a user on success', function() {
                projectView.removeUser(2);
                projectView.userEmail(2).getText().then(function() {
                    expect(true).toBe(false);
                    expect('error').toEqual('stale element reference');
                }, function(err) {
                    expect(true).toBe(true);
                    expect(err.state).toEqual('stale element reference');
                });
            });

        });
    });

    describe('Feature: My Projects', function() {

        describe('Create project', function() {

            it('should create project on success', function() {
                var projectName = 'Project' + Math.floor(Math.random() * 1001);

                projectView.createProject(projectName, 'testDescription');
                projectView.get();
                expect(projectView.projectName(3).getText()).toEqual(projectName);
            });
        });

        describe('Activate project', function() {

            it('should activate project on success', function() {
                projectView.activateProject(0);
                projectView.get();
                expect(projectView.navProjectName.getText()).toEqual('testProject');
            });
        });

        describe('Edit project', function() {

            it('should edit project on success', function() {
                var name = 'editedName',
                    description = 'editedDescription';

                projectView.editProject(3, name, description);
                expect(projectView.projectName(3).getText()).toEqual(name);
            });
        });

        describe('Delete project', function() {

            it('should delete project', function() {
                projectView.deleteProject(3);
                projectView.get();
                projectView.projectName(3).getText().then(function() {
                    expect(true).toBe(false);
                    expect('error').toEqual('stale element reference');
                }, function(err) {
                    expect(true).toBe(true);
                    expect(err.state).toEqual('stale element reference');
                });
            });
        });
    });

    describe('Feature: Sprints', function() {

        describe('Create sprint', function() {

            it('should create a sprint on success', function() {
                projectView.createSprint('testName', 'testGoal', '2100-01-01', '2100-12-31');
                expect(projectView.sprintName(7).getText()).toEqual('testName');
                expect(projectView.sprintGoal(7).getText()).toEqual('testGoal');
                expect(projectView.sprintDuration(7).getText()).toEqual('(2100-01-01 - 2100-12-31)');
            });

        });

        describe('Edit sprint', function() {

            it('should edit sprint on success', function() {
                projectView.editSprint(7, 'testName2', 'testGoal2', '2150-01-01', '2150-12-31');
                expect(projectView.sprintName(7).getText()).toEqual('testName2');
                expect(projectView.sprintGoal(7).getText()).toEqual('testGoal2');
                expect(projectView.sprintDuration(7).getText()).toEqual('(2150-01-01 - 2150-12-31)');
            });

        });

        describe('Delete sprint', function() {

            it('should delete sprint on success', function() {
                projectView.deleteSprint(7);
                expect(projectView.sprintName(7).getText()).not.toEqual('testName2');
            });

        });

    });
});