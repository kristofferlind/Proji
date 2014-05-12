'use strict';

describe('Controller: ProjectController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var ProjectController, scope, q, d,
        Project = {
            all: function() {
                d = q.defer();
                d.resolve('projects');
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
            setCurrentProject: jasmine.createSpy('setCurrentProject')
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
        d.resolve('projects');
        scope.$digest();
        expect(scope.projects).toBe('projects');
    });

    it('should request Sprint.all', function() {
        expect(Sprint.all).toHaveBeenCalled();
    });

    it('should request Project.getUsers', function() {
        expect(Project.getUsers).toHaveBeenCalled();
    });

    it('inviteUser should request Project.addUser', function() {
        scope.inviteUser();
        expect(Project.addUser).toHaveBeenCalled();
    });

    it('removeUser should request Project.removeUser', function() {
        scope.removeUser();
        expect(Project.removeUser).toHaveBeenCalled();
    });

    describe('makeProject', function() {
        it('should call Project.create', function() {
            scope.makeProject();
            scope.$digest();
            d.resolve('projects');
            scope.$digest();
            expect(Project.create).toHaveBeenCalled();
        });
    });

    describe('setCurrentProject', function() {
        it('should call User.setCurrentProject', function() {
            scope.setCurrentProject();
            expect(User.setCurrentProject).toHaveBeenCalled();
        });
    });

    describe('deleteProject', function() {
        it('should call Project.delete', function() {
            scope.deleteProject();
            expect(Project.delete).toHaveBeenCalled();
        });
    });

    describe('createSprint', function() {
        it('should call Sprint.create', function() {
            scope.createSprint();
            expect(Sprint.create).toHaveBeenCalled();
        });
    });

    describe('editSprint', function() {
        beforeEach(function() {
            scope.editSprint();
        });

        it('should call Sprint.find', function() {
            expect(Sprint.find).toHaveBeenCalled();
        });

        it('should set showEditSprint to true', function() {
            expect(scope.showEditSprint).toBe(true);
        });
    });

    describe('updateSprint', function() {
        beforeEach(function() {
            scope.updateSprint();
        });

        it('should call Sprint.update', function() {
            expect(Sprint.update).toHaveBeenCalled();
        });
    });

    describe('deleteSprint', function() {
        beforeEach(function() {
            scope.deleteSprint();
        });

        it('should call Sprint.update', function() {
            expect(Sprint.delete).toHaveBeenCalled();
        });
    });

    describe('hideEditSprint', function() {
        beforeEach(function() {
            scope.hideEditSprint();
        });

        it('should set viewEditSprint to false', function() {
            expect(scope.viewEditSprint).toBe(false);
        });
    });

});