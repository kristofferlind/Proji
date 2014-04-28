'use strict';

describe('View: /overview', function() {

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

            it('should abort operation on cancel', function() {});

            it('should edit project on success', function() {});

        });
    });

    describe('Feature: My projects', function() {

        it('should show a list of projects', function() {});

        it('should activate project on activate', function() {});

        it('should delete project on delete', function() {});
    });

    describe('Feature: Users', function() {

        describe('Add user', function() {

            it('should add a user on success', function() {});

        });

        describe('Remove user', function() {

            it('should remove a user on success', function() {});

        });
    });

    describe('Feature: Sprints', function() {

        describe('Create sprint', function() {

            it('should abort operation on cancel', function() {});

            it('should create a sprint on success', function() {});

        });
        describe('Edit sprint', function() {

            it('should abort operation on cancel', function() {});

            it('should edit sprint on success', function() {});

        });
        describe('Delete sprint', function() {

            it('should delete sprint on success', function() {});

        });

    });
});