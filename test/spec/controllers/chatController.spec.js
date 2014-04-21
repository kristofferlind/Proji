'use strict';

describe('Controller: ChatController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var ChatController, scope, q, d,
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
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projectId');
            scope.$digest();
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        ChatController = $controller('ChatController', {
            $scope: scope,
            User: User
        });
    }));

    it('should be defined', function() {
        expect(ChatController).toBeDefined();
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

    describe('$scope.sendMessage', function() {
        beforeEach(function() {
            resolver();
            scope.messages.$add = jasmine.createSpy('$add');
            scope.sendMessage();
        });

        it('should call $scope.messages.$add', function() {
            expect(scope.messages.$add).toHaveBeenCalled();
        });

        it('..with $scope.message', function() {
            expect(scope.messages.$add).toHaveBeenCalledWith(scope.message);
        });
    });
});