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
            // // var pbItem = element(by.css('.productbacklog .task-item:first-of-type')),
            // // var pbItem = element(by.repeater('(pbTaskId, pbTask) in pbTasks')).row(1),
            // var sbDropzone = element(by.css('.sprintbacklog p')),
            //     sbItem, pbItem, validate;

            // // browser.actions().dragAndDrop(pbItem.find(), sbDropzone.find()).perform();
            // // browser.actions().mouseDown(pbItem.find()).mouseMove(sbDropzone.find()).mouseUp().perform();

            // validate = function() {
            //     element.all(by.repeater('(sbTaskId, sbTask) in sbTasks')).then(function(tasks) {
            //         sbItem = tasks[0].findElement(by.css('.task-item-body p'));

            //         expect(sbItem.getText()).toEqual('? Task1 - Task1Description');
            //     });
            // };

            // // sbItem = element(by.css('.sprintbacklog .task-item:first-of-type'));


            // // protractor.getInstance().debugger();

            // element.all(by.repeater('(pbTaskId, pbTask) in pbTasks')).then(function(tasks) {
            //     pbItem = tasks[0].element(by.css('.task-item-body'));
            //     browser.sleep(500);
            //     // console.log(browser.actions().dragAndDrop(pbItem, sbDropzone));

            //     // var driver = new webdriver;
            //     browser.actions().dragAndDrop(pbItem.find(), sbDropzone.find()).perform();

            //     // browser.actions().mouseDown(pbItem).mouseMove(sbDropzone).mouseUp().perform();
            //     // browser.sleep(1000);

            //     // // console.log(browser.actions().mouseDown(pbItem).mouseMove(sbDropzone).mouseUp().perform());

            //     // browser.driver.actions().clickAndHold(pbItem).perform();
            //     // browser.sleep(500);
            //     // browser.actions().moveToElement(sbDropzone).perform();
            //     // browser.sleep(500);
            //     // browser.actions().release(sbDropzone).perform();


            //     browser.sleep(1000);
            //     validate();
            // });

            var pbItem = element(by.css('.productbacklog div[task-item]')),
                sbDrop = element(by.css('.sprintbacklog')),
                sbItem = element(by.css('.sprintbacklog div[task-item] .task-item-body'));

            browser.actions().dragAndDrop(pbItem.find(), sbDrop.find()).perform();

            browser.sleep(1000);

            expect(sbItem.getText()).toEqual('Task1 - Task1Description');


            // console.log(sbDrop.find());
            // console.log(sbDrop.find().getLocation);
            // console.log(sbDrop.find().getLocation());
            // sbDrop.find().getLocation().then(function(data) {
            //     console.log(data);
            // });

            // browser.actions().mouseDown(pbItem.find()).mouseMove(sbDrop.find()).mouseUp().perform();



            // browser.actions().dragAndDrop(pbItem.find(), {
            //     x: 600,
            //     y: 230
            // }).perform();
            // browser.actions().mouseDown(pbItem.find()).mouseUp(sbDrop.find()).perform();
            // browser.actions().mouseDown(pbItem.find()).mouseMove(sbDrop.find()).mouseUp(sbDrop.find()).perform();

            // pbItem.getText().then(function(text) {
            //     console.log(text);
            // });
            // sbDrop.getText().then(function(text) {
            //     console.log(text);
            // });

            // var ptor = protractor.getInstance();

            // ptor.actions().mouseDown(pbItem.find()).mouseUp(sbDrop.find());

            // browser.actions().mouseDown(pbItem.find()).perform();
            // browser.sleep(500);
            // browser.actions().mouseUp(sbDrop.find()).perform();

            // browser.actions().clickAndHold(pbItem.find()).perform();
            // browser.sleep(3000);
            // browser.actions().click(sbDrop.find()).perform();

            // browser.sleep(1000);
            // expect(sbItem.getText()).toEqual('?\n Task1 - Task1Description');

            //test

            // var sliderBar = element(by.name('points'));

            // browser.actions().
            // dragAndDrop(sliderBar.find(), {
            //     x: 5,
            //     y: 0
            // }).
            // perform();
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