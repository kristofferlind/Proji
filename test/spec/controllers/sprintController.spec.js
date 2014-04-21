'use strict';

describe('Controller: SprintController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var SprintController, scope, q, d,
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
            },
            getProjectId: function() {
                d = q.defer();
                return d.promise;
            }
        },
        Sprint = {
            all: jasmine.createSpy('all'),
            create: jasmine.createSpy('create'),
            find: jasmine.createSpy('find'),
            update: jasmine.createSpy('update'),
            delete: jasmine.createSpy('delete'),
            getCurrent: function() {
                d = q.defer();
                return d.promise;
            },
            getSprintTasks: jasmine.createSpy('getSprintTasks'),
            addTask: jasmine.createSpy('addTask'),
            removeTask: jasmine.createSpy('removeTask')
        },
        Task = {
            all: jasmine.createSpy('all'),
            update: jasmine.createSpy('update'),
            create: jasmine.createSpy('create'),
            delete: jasmine.createSpy('delete')
        },
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projectId');
            scope.$digest();
            // d.resolve('sprintId');
            // scope.$digest();
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        SprintController = $controller('SprintController', {
            $scope: scope,
            Sprint: Sprint,
            User: User,
            Task: Task
        });
    }));

    it('should be defined', function() {
        expect(SprintController).toBeDefined();
    });

    // beforeEach(function() {
    //     resolver();
    // });

    it('should call Task.all to populate $scope.pbTasks', function() {
        resolver();
        expect(Task.all).toHaveBeenCalled();
    });

    it('should call Sprint.getSprintTasks to populate $scope.sbTasks', function() {
        resolver();
        d.resolve('sprintId');
        scope.$digest();
        expect(Sprint.getSprintTasks).toHaveBeenCalled();
    });

    describe('$scope.toSprintBacklog(taskId, task)', function() {
        beforeEach(function() {
            resolver();
            d.resolve('sprintId');
            scope.$digest();
            scope.toSprintBacklog();
        });

        it('should call Sprint.addTask', function() {
            expect(Sprint.addTask).toHaveBeenCalled();
        });
    });

    describe('$scope.fromSprintBacklog(taskId)', function() {
        beforeEach(function() {
            resolver();
            d.resolve('sprintId');
            scope.$digest();
            scope.fromSprintBacklog();
        });

        it('should call Sprint.removeTask', function() {
            expect(Sprint.removeTask).toHaveBeenCalled();
        });
    });

    describe('$scope.showEditTask(taskId, task)', function() {
        beforeEach(function() {
            resolver();
            d.resolve('sprintId');
            scope.$digest();
            scope.showEditTask('taskId', 'task');
        });

        it('should set viewEditTask to true', function() {
            expect(scope.viewEditTask).toBe(true);
        });

        it('should set scope.task', function() {
            expect(scope.task).toBe('task');
        });

        it('should set scope.taskId', function() {
            expect(scope.taskId).toBe('taskId');
        });
    });

    describe('$scope.cancelEditTask()', function() {
        beforeEach(function() {
            resolver();
            d.resolve('sprintId');
            scope.$digest();
            scope.cancelEditTask();
        });

        it('should set viewEditTask to false', function() {
            expect(scope.viewEditTask).toBe(false);
        });
    });

    describe('$scope.createTask()', function() {
        beforeEach(function() {
            resolver();
            d.resolve('sprintId');
            scope.$digest();
            scope.createTask();
        });

        it('should call Task.create', function() {
            expect(Task.create).toHaveBeenCalled();
        });
    });

    describe('$scope.updateTask()', function() {
        beforeEach(function() {
            resolver();
            d.resolve('sprintId');
            scope.$digest();
            scope.updateTask();
        });

        it('should call Task.update', function() {
            expect(Task.update).toHaveBeenCalled();
        });
    });

    describe('$scope.deleteTask(taskId)', function() {
        beforeEach(function() {
            resolver();
            d.resolve('sprintId');
            scope.$digest();
            scope.deleteTask('taskId');
        });

        it('should call Task.delete', function() {
            expect(Task.delete).toHaveBeenCalled();
        });

        it('should call Task.delete with projectId, taskId', function() {
            expect(Task.delete).toHaveBeenCalledWith('projectId', 'taskId');
        });
    });

});