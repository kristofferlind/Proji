var projectView = function() {
    'use strict';

    //add sprint
    var addSprintButton = element(by.css('a[ng-click="showAddSprint=true"]')),
        newSprintNameInput = element(by.model('newSprint.name')),
        newSprintGoalInput = element(by.model('newSprint.goal')),
        newSprintStartInput = element(by.model('newSprint.start')),
        newSprintEndInput = element(by.model('newSprint.end')),
        createSprintButton = element(by.css('form[name="addSprintForm"] button[type="submit"]')),

        //edit sprint
        editSprintButtons = element.all(by.css('button[ng-click="editSprint(sprintId)"]')),
        editSprintNameInput = element(by.model('editedSprint.name')),
        editSprintGoalInput = element(by.model('editedSprint.goal')),
        editSprintStartInput = element(by.model('editedSprint.start')),
        editSprintEndInput = element(by.model('editedSprint.end')),
        updateSprintButton = element(by.css('form[name="editSprintForm"] button[type="submit"]')),

        //delete sprint
        deleteSprintButtons = element.all(by.css('button[on-confirm="deleteSprint(sprintId)"]')),

        //add user
        addUserButton = element(by.css('a[ng-click="showAddUser=true"]')),
        addUserInput = element(by.model('addUser.email')),
        inviteUserButton = element(by.css('form[name="inviteUserForm"] button[type="submit"]')),
        deleteUserButtons = element.all(by.css('button[on-confirm="removeUser(userId)"]')),

        //confirm
        dialogConfirmYes = element(by.css('button[ng-click="yes(dialog)"]')),

        //create project
        addProjectButton = element(by.css('a[ng-click="showAddProject=true"]')),
        newProjectNameInput = element(by.model('newProject.name')),
        newProjectDescriptionInput = element(by.model('newProject.description')),
        createProjectButton = element(by.css('form[name="createProjectForm"] button[type="submit"]')),

        //edit project
        editProjectButtons = element.all(by.css('button[ng-click="editProject(project.$id)"]')),
        editProjectNameInput = element(by.model('editedProject.name')),
        editProjectDescriptionInput = element(by.model('editedProject.description')),
        updateProjectButton = element(by.css('form[name="editProjectForm"] button[type="submit"]')),

        //activate project
        activateProjectButtons = element.all(by.css('button[ng-click="setCurrentProject(project.$id)"]')),

        //delete project
        deleteProjectButtons = element.all(by.css('button[on-confirm="deleteProject(project.$id)"]')),
        sleep = function() {
            browser.sleep(5000);
        },
        projectView = {
            //elements
            projectName: function(index) {
                return element.all(by.binding('project.name')).get(index);
            },
            sprintName: function(index) {
                return element.all(by.binding('sprint.name')).get(index);
            },
            sprintGoal: function(index) {
                return element.all(by.binding('sprint.goal')).get(index);
            },
            sprintDuration: function(index) {
                return element.all(by.binding('sprint.start')).get(index);
            },
            userEmail: function(index) {
                return element.all(by.binding('user')).get(index);
            },
            //Why doesn't this work?
            lastProjectName: element(by.css('.my-projects table tr:last-child td:first-child b')), //element.all(by.binding('project.name')).last(),
            // lastSprintName: function() {
            //     element.all(by.binding('project.name')).last().then(function(last) {
            //         return last;
            //     });
            // }, //element(by.css('.sprint-item:nth-child(9)')), //element.all(by.binding('sprint.name')).last(),
            // lastSprintGoal: element.all(by.binding('sprint.goal')).last(),
            // lastSprintDuration: element.all(by.binding('sprint.start')).last(),
            // lastUserEmail: element.all(by.binding('user')).last(),
            navProjectName: element(by.css('div.home-menu span[ng-click="showDetails=!showDetails"]')),
            //actions
            get: function() {
                element(by.css('a[href="#/"]')).click();
                browser.waitForAngular();
                element(by.css('a[href="#/project"]')).click();
                browser.waitForAngular();

                // browser.get('#/project');
                // sleep();
                // browser.waitForAngular();
            },
            createSprint: function(name, goal, start, end) {
                addSprintButton.click();
                newSprintNameInput.sendKeys(name);
                newSprintGoalInput.sendKeys(goal);
                newSprintStartInput.sendKeys(start);
                newSprintEndInput.sendKeys(end);
                createSprintButton.click();
                browser.waitForAngular();
            },
            editSprint: function(index, name, goal, start, end) {
                editSprintButtons.get(index).click();
                editSprintNameInput.clear();
                editSprintNameInput.sendKeys(name);
                editSprintGoalInput.clear();
                editSprintGoalInput.sendKeys(goal);
                editSprintStartInput.clear();
                editSprintStartInput.sendKeys(start);
                editSprintEndInput.clear();
                editSprintEndInput.sendKeys(end);
                updateSprintButton.click();
                browser.waitForAngular();
            },
            editLastSprint: function(name, goal, start, end) {
                editSprintButtons.last().click();
                editSprintNameInput.clear();
                editSprintNameInput.sendKeys(name);
                editSprintGoalInput.clear();
                editSprintGoalInput.sendKeys(goal);
                editSprintStartInput.clear();
                editSprintStartInput.sendKeys(start);
                editSprintEndInput.clear();
                editSprintEndInput.sendKeys(end);
                updateSprintButton.click();
                browser.waitForAngular();
            },
            deleteSprint: function(index) {
                deleteSprintButtons.get(index).click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
            deleteLastSprint: function() {
                deleteSprintButtons.last().click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
            addUser: function(email) {
                addUserButton.click();
                addUserInput.clear();
                addUserInput.sendKeys(email);
                inviteUserButton.click();
                browser.waitForAngular();
            },
            removeUser: function(index) {
                deleteUserButtons.get(index - 1).click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
            removeLastUser: function() {
                deleteUserButtons.last().click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
            createProject: function(name, description) {
                addProjectButton.click();
                newProjectNameInput.sendKeys(name);
                newProjectDescriptionInput.sendKeys(description);
                createProjectButton.click();
                sleep();
                browser.waitForAngular();
            },
            editProject: function(index, name, description) {
                editProjectButtons.get(index).click();
                editProjectNameInput.clear();
                editProjectNameInput.sendKeys(name);
                editProjectDescriptionInput.clear();
                editProjectDescriptionInput.sendKeys(description);
                updateProjectButton.click();
                browser.waitForAngular();
            },
            editLastProject: function(name, description) {
                editProjectButtons.last().click();
                editProjectNameInput.clear();
                editProjectNameInput.sendKeys(name);
                editProjectDescriptionInput.clear();
                editProjectDescriptionInput.sendKeys(description);
                updateProjectButton.click();
                browser.waitForAngular();
            },
            activateProject: function(index) {
                activateProjectButtons.get(index).click();
                sleep();
                browser.waitForAngular();
            },
            activateFirstProject: function() {
                activateProjectButtons.first().click();
                sleep();
                browser.waitForAngular();
            },
            deleteProject: function(index) {
                browser.waitForAngular();
                deleteProjectButtons.get(index).click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
            deleteLastProject: function() {
                browser.waitForAngular();
                deleteProjectButtons.last().click();
                dialogConfirmYes.click();
                browser.waitForAngular();
            },
        };

    return projectView;
};

module.exports = projectView();