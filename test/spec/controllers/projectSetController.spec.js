'use strict';

describe('Controller: ProjectSetController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var ProjectSetController, scope, q, d,
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
            },
            setCurrentProject: jasmine.createSpy('setCurrentProject')
        },
        Project = {
            all: function() {
                d = q.defer();
                return d.promise;
            },
            create: jasmine.createSpy('create')
        },
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projects');
            scope.$digest();
            // d.resolve('sprintId');
            // scope.$digest();
        };


    beforeEach(inject(function($controller, $rootScope, $q, $location) {
        q = $q;
        scope = $rootScope.$new();
        ProjectSetController = $controller('ProjectSetController', {
            $scope: scope,
            Project: Project,
            User: User,
            location: $location
        });
    }));

    it('should be defined', function() {
        expect(ProjectSetController).toBeDefined();
    });

    describe('$scope.projects', function() {
        beforeEach(function() {
            resolver();
        });

        it('should be populated by projects', function() {
            expect(scope.projects).toBe('projects');
        });
    });

    describe('$scope.createProject', function() {
        beforeEach(function() {
            resolver();
            scope.newProject = {};
            scope.createProject();
        });

        it('should call Project.create', function() {
            expect(Project.create).toHaveBeenCalled();
        });

        it('..with {}', function() {
            expect(Project.create).toHaveBeenCalledWith({});
        });
    });

    describe('$scope.setCurrentProject', function() {
        beforeEach(function() {
            resolver();
            scope.setCurrentProject('projectId');
        });

        it('should call User.setCurrentProject', function() {
            expect(User.setCurrentProject).toHaveBeenCalled();
        });

        it('..with userId, projectId', function() {
            expect(User.setCurrentProject).toHaveBeenCalledWith('userId', 'projectId');
        });

    });

});