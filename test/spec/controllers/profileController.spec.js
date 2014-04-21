'use strict';

describe('Controller: ProfileController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var ProfileController, scope, q, d,
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
            },
            find: jasmine.createSpy('find'),
            update: jasmine.createSpy('update')
        },
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        ProfileController = $controller('ProfileController', {
            $scope: scope,
            User: User
        });
    }));

    it('should be defined', function() {
        expect(ProfileController).toBeDefined();
    });

    describe('$scope.user', function() {
        beforeEach(function() {
            resolver();
        });

        it('should call User.find', function() {
            expect(User.find).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.find).toHaveBeenCalledWith('userId');
        });
    });

    describe('$scope.update', function() {
        beforeEach(function() {
            resolver();
            scope.user = {};
            scope.update();
        });

        it('should call User.update', function() {
            expect(User.update).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.update).toHaveBeenCalledWith('userId', {});
        });
    });
});