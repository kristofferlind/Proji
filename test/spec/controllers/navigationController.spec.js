'use strict';

describe('Controller: NavigationController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var NavigationController, scope, q, d,
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
            },
            getProjectId: function() {
                d = q.defer();
                return d.promise;
            },
            find: function(userId) {
                return {
                    md5Hash: 'md5Hash',
                    uid: userId,
                    username: 'username'
                };
            }
        },
        Project = {
            find: jasmine.createSpy('find')
        },
        location = {
            path: jasmine.createSpy('location')
        },
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projectId');
            scope.$digest();
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        NavigationController = $controller('NavigationController', {
            $scope: scope,
            User: User,
            Project: Project,
            $location: location
        });
    }));

    it('should be defined', function() {
        expect(NavigationController).toBeDefined();
    });

    describe('$scope.user', function() {
        beforeEach(function() {
            spyOn(User, 'find').and.callThrough();
            resolver();
        });

        it('should call User.find', function() {
            expect(User.find).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.find).toHaveBeenCalledWith('userId');
        });
    });

    describe('$scope.project', function() {
        beforeEach(function() {
            resolver();
        });

        it('should call User.find', function() {
            expect(Project.find).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(Project.find).toHaveBeenCalledWith('projectId');
        });
    });

    describe('In case of no projectId', function() {
        beforeEach(function() {
            // spyOn(location, 'path');
            d.resolve('userId');
            scope.$digest();
            d.resolve(false);
            scope.$digest();
        });

        it('should redirect user', function() {
            expect(location.path).toHaveBeenCalled();
        });

        it('..to /project/set', function() {
            expect(location.path).toHaveBeenCalledWith('/project/set');
        });
    });
});