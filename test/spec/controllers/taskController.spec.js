'use strict';

describe('Controller: TaskController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var TaskController, scope, q, d,
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
            },
            getProjectId: function() {
                d = q.defer();
                return d.promise;
            },
            getTask: jasmine.createSpy('getTask'),
            startTask: jasmine.createSpy('startTask'),
            finnishTask: jasmine.createSpy('finnishTask'),
            stopTask: jasmine.createSpy('stopTask')
        },
        Sprint = {
            getCurrent: function() {
                d = q.defer();
                return d.promise;
            },
            getSprintTasks: jasmine.createSpy('getSprintTasks')
        },
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projectId');
            scope.$digest();
            d.resolve('sprintId');
            scope.$digest();
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        TaskController = $controller('TaskController', {
            $scope: scope,
            Sprint: Sprint,
            User: User
        });
    }));

    it('should be defined', function() {
        expect(TaskController).toBeDefined();
    });

    it('should call getSprintTasks to populate $scope.sbTasks', function() {
        resolver();
        expect(Sprint.getSprintTasks).toHaveBeenCalled();
    });

    it('..with projectId, sprintId', function() {
        resolver();
        expect(Sprint.getSprintTasks).toHaveBeenCalledWith('projectId', 'sprintId');
    });

    describe('$scope.currentTask', function() {
        beforeEach(function() {
            resolver();
        });

        it('should call User.getTask', function() {
            expect(User.getTask).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.getTask).toHaveBeenCalledWith('userId');
        });
    });

    describe('$scope.workOnTask', function() {
        beforeEach(function() {
            resolver();
            scope.workOnTask('taskId', 'task');
        });

        it('should call User.startTask', function() {
            expect(User.startTask).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.startTask).toHaveBeenCalledWith('userId', 'taskId', 'task');
        });
    });

    describe('$scope.markTaskAsDone', function() {
        beforeEach(function() {
            resolver();
            scope.currentTask = {
                taskId: 'taskId'
            };
            scope.markTaskAsDone();
        });

        it('should call User.finnishTask', function() {
            expect(User.finnishTask).toHaveBeenCalled();
        });
    });

    describe('$scope.stopWorkOnTask', function() {
        beforeEach(function() {
            resolver();
            scope.currentTask = {
                taskId: 'taskId'
            };
            scope.stopWorkOnTask();
        });

        it('should call User.stopTask', function() {
            expect(User.stopTask).toHaveBeenCalled();
        });
    });

});