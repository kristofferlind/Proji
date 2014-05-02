'use strict';

describe('View: /project', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('#/project/');
    });

    afterEach(function() {
        browser.ignoreSynchronization = false;
    });

    describe('Feature: Project', function() {

        it('should show project name', function() {
            expect(element(by.model('project.name')).getText()).toEqual('testProject');
        });
        it('should show project description', function() {
            expect(element(by.model('project.description')).getText()).toEqual('testDescription');
        });

        describe('Create project', function() {

            it('should abort operation on cancel', function() {
                var createButton = element(by.css('.editProject button:nth-of-type(2)')),
                    cancelButton = element(by.css('.createProject button:nth-of-type(2)'));

                createButton.click();
                cancelButton.click();
            });

            it('should create project on success', function() {
                var showCreateButton = element(by.css('.editProject button:nth-of-type(2)')),
                    createButton = element(by.css('.createProject button.pure-button-primary')),
                    nameInput = element(by.model('newProject.name')),
                    descriptionInput = element(by.model('newProject.description')),
                    projectName = 'Project' + Math.floor(Math.random() * 1001);

                showCreateButton.click();
                nameInput.sendKeys(projectName);
                descriptionInput.sendKeys('testDescription');
                createButton.click();

                browser.sleep(1000);
                browser.get('#/project/');
                browser.sleep(1000);

                element.all(by.binding('project.name')).then(function(names) {
                    names[names.length - 1].getText().then(function(name) {
                        expect(name).toEqual(projectName + ' - testDescription');
                    });
                });

            });
        });

        describe('Edit project', function() {

            it('should edit project on success', function() {
                var nameField = element(by.css('.editProject h2')),
                    descriptionField = element(by.model('project.description')),
                    saveButton = element(by.css('.editProject .pure-button-primary'));

                nameField.clear();

                nameField.sendKeys('Project');

                descriptionField.clear();

                descriptionField.sendKeys('Description');

                saveButton.click();

                browser.sleep(1000);
                browser.get('#/project/');
                browser.sleep(1000);

                expect(nameField.getText()).toEqual('Project');
                expect(descriptionField.getText()).toEqual('Description');
            });

            it('should change it back (not to break other tests)', function() {
                var nameField = element(by.css('.editProject h2')),
                    descriptionField = element(by.model('project.description')),
                    saveButton = element(by.css('.editProject .pure-button-primary'));

                nameField.clear();
                nameField.sendKeys('testProject');

                descriptionField.clear();
                descriptionField.sendKeys('testDescription');

                saveButton.click();

                browser.sleep(1000);
                browser.get('#/project/');
                browser.sleep(1000);

                expect(nameField.getText()).toEqual('testProject');
                expect(descriptionField.getText()).toEqual('testDescription');
            });
        });
    });

    describe('Feature: My projects', function() {

        it('should show a list of projects', function() {
            element.all(by.repeater('project in projects')).then(function(projects) {
                var name1 = projects[0].findElement(by.binding('project.name')).getText();

                expect(name1).toEqual('testProject - testDescription');
            });
        });

        it('should activate project on activate', function() {
            element.all(by.repeater('project in projects')).then(function(projects) {
                var activateButton = projects[1].findElement(by.css('button:first-of-type')),
                    projectName = element(by.css('.editProject h2'));

                activateButton.click();

                browser.sleep(1000);
                browser.get('#/project/');
                browser.sleep(1000);

                expect(projectName.getText()).toEqual('anotherProject');
            });
        });

        it('should activate first project again(not to break tests)', function() {
            element.all(by.repeater('project in projects')).then(function(projects) {
                var activateButton = projects[0].findElement(by.css('button:first-of-type')),
                    projectName = element(by.css('.editProject h2'));

                activateButton.click();

                browser.sleep(1000);
                browser.get('#/project/');
                browser.sleep(1000);

                expect(projectName.getText()).toEqual('testProject');
            });
        });


        it('should delete project on delete', function() {
            element.all(by.repeater('project in projects')).then(function(projects) {
                var deleteButton = projects[2].findElement(by.css('button:nth-of-type(2)'));

                deleteButton.click();

                browser.sleep(1000);
                browser.get('#/project/');
                browser.sleep(1000);

                projects[2].getText().then(function() {
                    expect(true).toBe(false);
                    expect('error').toEqual('stale element reference');
                }, function(err) {
                    expect(true).toBe(true);
                    expect(err.state).toEqual('stale element reference');
                });
            });
        });
    });

    describe('Feature: Users', function() {

        it('should show users', function() {
            element.all(by.repeater('(userId, user) in users')).then(function(users) {
                // var user1 = users[0].findElement(by.binding('user'));

                expect(users[0].getText()).toEqual('simplelogin:29 - Remove');
            });
        });

        describe('Add user', function() {

            it('should add a user on success', function() {
                var inviteInput = element(by.css('#addUser')),
                    inviteButton = element(by.css('#inviteUser'));

                inviteInput.sendKeys('testUser');
                inviteButton.click();

                browser.sleep(1000);

                element.all(by.repeater('(userId, user) in users')).then(function(users) {
                    var user = users[1].findElement(by.binding('user'));
                    expect(user.getText()).toEqual('testUser');
                });

                browser.sleep(1000);
            });

        });

        describe('Remove user', function() {

            it('should remove a user on success', function() {
                element.all(by.repeater('(userId, user) in users')).then(function(users) {
                    var deleteButton = users[1].findElement(by.css('button'));

                    deleteButton.click();

                    browser.sleep(1000);
                    browser.get('#/project/');
                    browser.sleep(1000);

                    users[1].getText().then(function() {
                        expect(true).toBe(false);
                        expect('error').toEqual('stale element reference');
                    }, function(err) {
                        expect(true).toBe(true);
                        expect(err.state).toEqual('stale element reference');
                    });
                });
            });

        });
    });

    describe('Feature: Sprints', function() {

        describe('Create sprint', function() {

            it('should create a sprint on success', function() {
                var nameInput = element(by.model('newSprint.name')),
                    goalInput = element(by.model('newSprint.goal')),
                    startInput = element(by.model('newSprint.start')),
                    endInput = element(by.model('newSprint.end')),
                    createButton = element(by.css('.createSprint .pure-button-primary'));

                nameInput.sendKeys('testName');
                goalInput.sendKeys('testGoal');
                startInput.sendKeys('01012100'); //2100-01-01, it starts in the middle for some reason..
                endInput.sendKeys('12312100');
                createButton.click();

                browser.sleep(2000);

                element.all(by.css('.sprint-item')).then(function(sprints) {
                    var sprintName = sprints[1].findElement(by.binding('sprint.name')),
                        sprintGoal = sprints[1].findElement(by.binding('sprint.goal')),
                        sprintDuration = sprints[1].findElement(by.binding('sprint.start'));

                    expect(sprintName.getText()).toEqual('testName');
                    expect(sprintGoal.getText()).toEqual('testGoal');
                    expect(sprintDuration.getText()).toEqual('(2100-01-01 - 2100-12-31)');
                });
            });

        });
        describe('Edit sprint', function() {

            it('should abort operation on cancel', function() {
                element.all(by.css('.sprint-item')).then(function(sprints) {
                    var sprintItem = sprints[1];
                    sprintItem.click();

                    var cancelButton = element(by.css('.editSprint button:nth-of-type(2)'));
                    cancelButton.click();

                    var header = element(by.css('.createSprint h2'));
                    expect(header.getText()).toEqual('Create sprint');
                });
            });

            it('should edit sprint on success', function() {
                element.all(by.css('.sprint-item')).then(function(sprints) {
                    var sprintItem = sprints[1];
                    sprintItem.click();

                    var nameInput = element(by.model('sprint.name')),
                        goalInput = element(by.model('sprint.goal')),
                        updateButton = element(by.css('.editSprint .pure-button-primary'));

                    nameInput.sendKeys('1');
                    goalInput.sendKeys('2');
                    updateButton.click();
                    validate();
                });

                var validate = function() {
                    element.all(by.css('.sprint-item')).then(function(sprints) {
                        var sprintItem = sprints[1],
                            updatedName = sprintItem.findElement(by.binding('sprint.name')),
                            updatedGoal = sprintItem.findElement(by.binding('sprint.goal'));

                        expect(updatedName.getText()).toEqual('testName1');
                        expect(updatedGoal.getText()).toEqual('testGoal2');
                    });
                };
            });

        });
        describe('Delete sprint', function() {

            it('should delete sprint on success', function() {
                element.all(by.css('.sprint-item')).then(function(sprints) {
                    var sprintItem = sprints[1],
                        deleteButton = sprints[1].findElement(by.css('.sprint-item-close a'));

                    deleteButton.click();

                    sprintItem.getText().then(function() {
                        expect('error').toEqual('stale element reference');
                    }, function(err) {
                        expect(err.state).toEqual('stale element reference');
                    });
                });
            });

        });

    });
});