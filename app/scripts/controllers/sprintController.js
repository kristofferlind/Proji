/*
    Controller for sprint page (plan sprint)
    view: /sprint
*/

angular.module('projiApp')

.controller('SprintController', function($scope, Sprint, Task, $rootScope) {
    'use strict';

    var projectId = $rootScope.currentUser.pid,
        sprintId = $rootScope.currentUser.sid,
        //Calculate backlog points
        calculatePoints = function(values) {
            var points = 0;

            //This is a unnecessarily complex, rewrite..

            //Loop through properties on object
            for (var key in values) {
                //If first char is $, its a private prop in which case it should be skipped
                if (key.substr(0, 1) !== '$') {
                    //item = property (makes fetching subproperties less verbose)
                    var item = values[key];
                    //check that points is not ? and status is something other than Completed
                    if (item.points && item.points !== '?' && item.status && item.status !== 'Completed') {
                        //Add points, parse to make sure it doesn't concatenate
                        points += parseInt(item.points);
                    }
                }
            }
            return points;
        };

    //Watch for changes on tasks in sprint backlog, update points on change
    $scope.$watchCollection('sbTasks', function() {
        $scope.sbPoints = calculatePoints($scope.sbTasks);
    });

    //Watch for changes on tasks in product backlog, update points on change
    $scope.$watchCollection('pbTasks', function() {
        $scope.pbPoints = calculatePoints($scope.pbTasks);
    });

    //Initialization
    $scope.pbTasks = Task.all(projectId);
    $scope.pbStatus = 'Not Started';
    $scope.sbTasks = Sprint.getSprintTasks(projectId, sprintId);
    $scope.pbPoints = calculatePoints($scope.pbTasks);
    $scope.sbPoints = calculatePoints($scope.sbTasks);

    //Add task to sprint backlog (when dragging task to sprint backlog)
    $scope.toSprintBacklog = function(taskId, task) {
        Sprint.addTask(projectId, sprintId, taskId, task);
    };

    //Remove task from sprint backlog (when dragging task from sprint backlog)
    $scope.fromSprintBacklog = function(taskId, task) {
        Sprint.removeTask(projectId, sprintId, taskId, task);
    };

    //Create task
    $scope.createTask = function() {
        Task.create(projectId, $scope.newTask);
        $scope.newTask = {}; //Clear
    };

    //Logic for showing modal to edit task
    $scope.showEditTask = function(taskId) {
        $scope.editedTask = Task.find(projectId, taskId);
        $scope.taskId = taskId;
        $scope.viewEditTask = true; //Show modal
    };

    //Update task
    $scope.updateTask = function() {
        Task.update(projectId, $scope.taskId, $scope.editedTask);
        $scope.viewEditTask = false; //Hide modal
    };

    //Delete task
    $scope.deleteTask = function(taskId, task) {
        Task.delete(projectId, taskId, task);
    };
});