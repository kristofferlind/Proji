var sprintView = function() {
    'use strict';

    var taskNameInput = element(by.model('newTask.name')),
        taskDescriptionInput = element(by.model('newTask.description')),
        taskTagsInput = element(by.model('newTask.tags')),
        taskPointsInput = element(by.model('newTask.points')),
        taskPriorityInput = element(by.model('newTask.priority')),
        taskCreateButton = element(by.css('form[name="createTaskForm"] button[type="submit"]')),
        editTaskButtons = element.all(by.css('button[ng-click="showEditTask(pbTask.Id, pbTask)"]')),
        editTaskNameInput = element(by.model('editedTask.name')),
        editTaskDescriptionInput = element(by.model('editedTask.description')),
        editTaskTagsInput = element(by.model('editedTask.tags')),
        editTaskPointsInput = element(by.model('editedTask.points')),
        editTaskPriorityInput = element(by.model('editedTask.priority')),
        editTaskUpdateButton = element(by.css('form[name="editTaskForm"] button[type="submit"]')),
        deleteTaskButtons = element.all(by.css('button[on-confirm="deleteTask(pbTask.Id, pbTask)"]')),
        dialogConfirmYes = element(by.css('button[ng-click="yes(dialog)"]')),
        sleep = function() {
            browser.sleep(2000);
        },
        getPosition = function(value) {
            if (value > 50) {
                return 100;
            } else {
                return -100;
            }
        },
        sprintView = {
            //elements
            pbTasks: element.all(by.css('div[drag-type="pb"]')), //by.css('div[drop-type="sb"] div[task-item]')), //by.css('.productbacklog .task-item-body')), //by.css('div[drag-type="pb"]')), //by.css('div[drop-type="sb"] div[task-item]')),
            sbTasks: element.all(by.css('div[drag-type="sb"]')), //.sprintbacklog .task-item-body')), //div[drag-type="sb"]')), //by.css('div[drop-type="pb"] div[task-item]')),
            //actions
            get: function() {
                element(by.css('a[href="#/"]')).click();
                browser.waitForAngular();
                element(by.css('a[href="#/sprint"]')).click();
                browser.waitForAngular();
                // browser.get('#/sprint');
                // sleep();
                // browser.waitForAngular();
            },
            createTask: function(name, description, tags, points, priority) {
                taskNameInput.sendKeys(name);
                taskDescriptionInput.sendKeys(description);
                taskTagsInput.sendKeys(tags);
                browser.actions().dragAndDrop(taskPointsInput, {
                    x: getPosition(points),
                    y: 0
                }).perform();
                browser.actions().dragAndDrop(taskPriorityInput, {
                    x: getPosition(priority),
                    y: 0
                }).perform();
                taskCreateButton.click();
                sleep();
                browser.waitForAngular();
            },
            editLastTask: function(name, description, tags, points, priority) {
                editTaskButtons.last().click();
                editTaskNameInput.clear();
                editTaskNameInput.sendKeys(name);
                editTaskDescriptionInput.clear();
                editTaskDescriptionInput.sendKeys(description);
                editTaskTagsInput.clear();
                editTaskTagsInput.sendKeys(tags);
                browser.actions().dragAndDrop(editTaskPointsInput, {
                    x: getPosition(points),
                    y: 0
                }).perform();
                browser.actions().dragAndDrop(editTaskPriorityInput, {
                    x: getPosition(priority),
                    y: 0
                }).perform();
                editTaskUpdateButton.click();
                browser.waitForAngular();
            },
            deleteLastTask: function() {
                deleteTaskButtons.last().click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
            dragPbToSb: function() {},
            dragSbToPb: function() {},
            filterPb: function() {},
            filterSb: function() {}
        };

    return sprintView;
};

module.exports = sprintView();