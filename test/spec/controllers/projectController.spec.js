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
            find: jasmine.createSpy('find'),
            update: jasmine.createSpy('update'),
            delete: jasmine.createSpy('delete')
        },
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
            },
            getProjectId: function() {
                d = q.defer();
                return d.promise;
            },
            setCurrentProject: jasmine.createSpy('setCurrentProject')
        },
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projectId');
            scope.$digest();
            d.resolve('projects');
            scope.$digest();
        };



    beforeEach(inject(function($controller, $rootScope, $q, $location) {
        q = $q;
        scope = $rootScope.$new();
        ProjectController = $controller('ProjectController', {
            $scope: scope,
            Project: Project,
            Sprint: Sprint,
            User: User,
            location: $location
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

    it('should request Project.getUsers', function() {
        resolver();
        expect(Project.getUsers).toHaveBeenCalled();
    });

    it('inviteUser should request Project.addUser', function() {
        resolver();
        scope.inviteUser();
        expect(Project.addUser).toHaveBeenCalled();
    });

    it('removeUser should request Project.removeUser', function() {
        resolver();
        scope.removeUser();
        expect(Project.removeUser).toHaveBeenCalled();
    });

    describe('createProject', function() {
        it('should call Project.create', function() {
            resolver();
            scope.createProject();
            expect(Project.create).toHaveBeenCalled();
        });

        it('should update nav and chat');
    });

    describe('setCurrentProject', function() {
        it('should call User.setCurrentProject', function() {
            resolver();
            scope.setCurrentProject();
            expect(User.setCurrentProject).toHaveBeenCalled();
        });
    });

    describe('deleteProject', function() {
        it('should call Project.delete', function() {
            resolver();
            scope.deleteProject();
            expect(Project.delete).toHaveBeenCalled();
        });
    });

    describe('createSprint', function() {
        it('should call Sprint.create', function() {
            resolver();
            scope.createSprint();
            expect(Sprint.create).toHaveBeenCalled();
        });
    });

    describe('editSprint', function() {
        beforeEach(function() {
            resolver();
            scope.editSprint();
        });

        it('should call Sprint.find', function() {
            expect(Sprint.find).toHaveBeenCalled();
        });

        it('should set viewEditSprint to true', function() {
            expect(scope.viewEditSprint).toBe(true);
        });
    });

    describe('updateSprint', function() {
        beforeEach(function() {
            resolver();
            scope.updateSprint();
        });

        it('should call Sprint.update', function() {
            expect(Sprint.update).toHaveBeenCalled();
        });
    });

    describe('deleteSprint', function() {
        beforeEach(function() {
            resolver();
            scope.deleteSprint();
        });

        it('should call Sprint.update', function() {
            expect(Sprint.delete).toHaveBeenCalled();
        });
    });

    describe('hideEditSprint', function() {
        beforeEach(function() {
            resolver();
            scope.hideEditSprint();
        });

        it('should set viewEditSprint to false', function() {
            expect(scope.viewEditSprint).toBe(false);
        });
    });

});