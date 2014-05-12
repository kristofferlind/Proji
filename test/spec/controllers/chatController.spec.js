'use strict';

ddescribe('Controller: ChatController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var ChatController, scope, q,
        User = {
            find: function(userId) {
                return {
                    md5Hash: 'md5Hash',
                    uid: userId,
                    username: 'username'
                };
            }
        },
        firebase = {
            $add: function() {
                return;
            }
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        $rootScope.currentUser = {
            pid: 'projectId',
            uid: 'userId',
            md5Hash: 'hash',
            username: 'username'
        };
        ChatController = $controller('ChatController', {
            $scope: scope,
            User: User,
            $firebase: firebase
        });
    }));

    it('should be defined', function() {
        expect(ChatController).toBeDefined();
    });

    describe('$scope.user', function() {
        beforeEach(function($rootScope) {
            spyOn(User, 'find').and.callThrough();
            $rootScope.$broadcast('resolved');
            scope.$digest();
        });

        it('should call User.find', function() {
            expect(User.find).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(User.find).toHaveBeenCalledWith('userId');
        });
    });

    describe('$scope.sendMessage', function() {
        beforeEach(function($rootScope) {
            $rootScope.$broadcast('resolved');
            scope.messages.$add = jasmine.createSpy('$add');
            var fakeEvent = {
                keyCode: 13
            };
            scope.sendMessage(fakeEvent);
        });

        it('should call $scope.messages.$add', function() {
            expect(scope.messages.$add).toHaveBeenCalled();
        });

        it('..with $scope.message', function() {
            expect(scope.messages.$add).toHaveBeenCalledWith(scope.message);
        });
    });
});