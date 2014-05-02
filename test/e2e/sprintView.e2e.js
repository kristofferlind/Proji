'use strict';

describe('View: /sprint', function() {

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('#/sprint/');
    });

    afterEach(function() {
        browser.ignoreSynchronization = false;
    });

    describe('Feature: Product backlog', function() {

        it('should put task in sprint backlog on drag', function() {
            var pbItem = element(by.css('.productbacklog div[task-item]')),
                sbDrop = element(by.css('.sprintbacklog')),
                sbItem = element(by.css('.sprintbacklog div[task-item] .task-item-body'));

            browser.actions().dragAndDrop(pbItem, sbDrop).perform();

            browser.sleep(1000);

            expect(sbItem.getText()).toEqual('Task1 - Task1Description');
        });

        it('should be possible to create a task', function() {
            var nameInput = element(by.model('newTask.name')),
                descriptionInput = element(by.model('newTask.description')),
                createButton = element(by.css('form[ng-submit="createTask()"] button.pure-button-primary'));

            nameInput.sendKeys('testTask');
            descriptionInput.sendKeys('testDescription');
            createButton.click();

            browser.sleep(500);

            element.all(by.css('div[task-item] .task-item-body')).then(function(tasks) {
                expect(tasks[5].getText()).toEqual('testTask - testDescription');
            });
        });

        it('should be possible to edit a task', function() {
            element.all(by.css('div[task-item] .task-item-body')).then(function(tasks) {
                var taskItem = tasks[5],
                    cogButton = tasks[5].findElement(by.css('.task-item-delete a:first-child'));

                cogButton.click();

                var nameInput = element(by.model('task.name')),
                    descriptionInput = element(by.model('task.description')),
                    updateButton = element(by.css('form[ng-submit="updateTask()"] button:first-child'));

                nameInput.sendKeys('1');
                descriptionInput.sendKeys('1');

                updateButton.click();

                expect(taskItem.getText()).toEqual('testTask1 - testDescription1');
            });
        });

        it('should be possible to remove a task', function() {
            element.all(by.css('div[task-item] .task-item-body')).then(function(tasks) {
                var taskItem = tasks[5],
                    deleteButton = tasks[5].findElement(by.css('.task-item-delete a:last-child'));

                deleteButton.click();

                taskItem.getText().then(function() {
                    expect('error').toEqual('stale element reference');
                }, function(err) {
                    expect(err.state).toEqual('stale element reference');
                });
            });
        });
    });

    describe('Feature: Sprint backlog', function() {

        it('should remove task from sprint backlog on drag to product backlog');
    });
});