'use strict';

describe('Controller: ProjectController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var ProjectController, scope, q, d,
        Project = {
            all: function() {
                d = q.defer();
                return d.promise;
            },
            addUser: jasmine.createSpy('addUser'),
            removeUser: jasmine.createSpy('removeUser'),
            create: jasmine.createSpy('create'),
            delete: jasmine.createSpy('delete'),
            find: jasmine.createSpy('find'),
            getUsers: jasmine.createSpy('getUsers')
        },
        Sprint = {
            all: jasmine.createSpy('all'),
            create: jasmine.createSpy('create'),
            find: jasmine.createSpy('find')
        },
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
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projectId');
            scope.$digest();
            d.resolve('projects');
            scope.$digest();
        };



    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        ProjectController = $controller('ProjectController', {
            $scope: scope,
            Project: Project,
            Sprint: Sprint,
            User: User
        });
    }));

    it('should be defined', function() {
        expect(ProjectController).toBeDefined();
    });

    it('should populate $scope.projects', function() {
        resolver();
        expect(scope.projects).toBe('projects');
    });

    it('should request Sprint.all', function() {
        resolver();
        expect(Sprint.all).toHaveBeenCalled();
    });
});