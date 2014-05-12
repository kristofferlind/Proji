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
        };


    beforeEach(inject(function($controller, $rootScope, $q, $location) {
        q = $q;
        scope = $rootScope.$new();
        $rootScope.currentUser = {
            pid: 'projectId',
            uid: 'userId',
            md5Hash: 'hash',
            username: 'username',
            email: 'email'
        };
        ProjectSetController = $controller('ProjectSetController', {
            $scope: scope,
            Project: Project,
            User: User,
            location: $location
        });
        d.resolve('userId');
        scope.$digest();
    }));

    it('should be defined', function() {
        expect(ProjectSetController).toBeDefined();
    });

    describe('$scope.projects', function() {
        beforeEach(function() {});

        it('should be populated by projects', function() {
            d.resolve('projects');
            scope.$digest();
            expect(scope.projects).toBe('projects');
        });
    });

    describe('$scope.createProject', function() {
        beforeEach(function() {
            scope.newProject = {};
            scope.createProject();
        });

        it('should call Project.create', function() {
            expect(Project.create).toHaveBeenCalled();
        });

        it('..with userId, {}', function() {
            expect(Project.create).toHaveBeenCalledWith('userId', 'email', {});
        });
    });

    describe('$scope.setCurrentProject', function() {
        beforeEach(function() {
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