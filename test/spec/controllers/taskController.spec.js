'use strict';

describe('Controller: TaskController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var TaskController, scope, q,
        User = {
            getTask: jasmine.createSpy('getTask'),
            startTask: jasmine.createSpy('startTask'),
            finnishTask: jasmine.createSpy('finnishTask'),
            stopTask: jasmine.createSpy('stopTask')
        },
        Sprint = {
            getSprintTasks: jasmine.createSpy('getSprintTasks')
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        $rootScope.currentUser = {
            pid: 'projectId',
            uid: 'userId',
            md5Hash: 'hash',
            username: 'username',
            sid: 'sprintId'
        };
        TaskController = $controller('TaskController', {
            $scope: scope,
            Sprint: Sprint,
            User: User
        });
    }));

    // var $scope, $rootScope, $controller;

    // beforeEach(inject(function($injector) {
    //     $scope = $injector.get('$scope');
    //     $rootScope = $injector.get('$rootScope');
    //     q = $injector.get('$q');
    //     $controller = $injector.get('$controller');

    //     scope = $rootScope.$new();
    //     $rootScope.currentUser = {
    //         pid: 'projectId',
    //         uid: 'userId',
    //         md5Hash: 'hash',
    //         username: 'username',
    //         sid: 'sprintId'
    //     };

    //     TaskController = function() {
    //         return $controller('TaskController', {
    //             '$scope': scope,
    //             'Sprint': Sprint,
    //             'User': User
    //         });
    //     };
    // }));

    it('should be defined', function() {
        expect(TaskController).toBeDefined();
    });

    it('should call getSprintTasks to populate $scope.sbTasks', function() {
        expect(Sprint.getSprintTasks).toHaveBeenCalled();
    });

    it('..with projectId, sprintId', function() {
        expect(Sprint.getSprintTasks).toHaveBeenCalledWith('projectId', 'sprintId');
    });

    describe('$scope.currentTask', function() {
        beforeEach(function() {});

        it('should call User.getTask', function() {
            expect(User.getTask).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.getTask).toHaveBeenCalledWith('projectId', 'userId');
        });
    });

    describe('$scope.workOnTask', function() {
        beforeEach(function() {
            scope.workOnTask('taskId', 'task');
        });

        it('should call User.startTask', function() {
            expect(User.startTask).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.startTask).toHaveBeenCalledWith('projectId', 'sprintId', 'userId', 'taskId', 'task');
        });
    });

    describe('$scope.markTaskAsDone', function() {
        beforeEach(function() {
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