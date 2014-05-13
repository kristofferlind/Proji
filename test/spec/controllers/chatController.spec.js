'use strict';

describe('Controller: ChatController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$firebase', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

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
        customSpy = function(obj, method, fn) {
            obj[method] = fn;
            spyOn(obj, method).and.callThrough();
        },
        stub = function() {
            var out = {};
            angular.forEach(arguments, function(method) {
                out[method] = jasmine.createSpy();
            });
            return out;
        },
        authStub = function() {
            var AuthStub = function() {
                return AuthStub.fns;
            };
            AuthStub.fns = stub('$login', '$logout');
            return AuthStub;
        },
        firebaseStub = function() {
            var FirebaseStub = function() {
                return FirebaseStub.fns;
            };

            FirebaseStub.fns = {
                $add: jasmine.createSpy('$add'),
                $remove: jasmine.createSpy('$remove'),
                callbackVal: null
            };

            customSpy(FirebaseStub.fns, '$set', function(value, cb) {
                cb && cb(FirebaseStub.fns.callbackVal);
            });

            customSpy(FirebaseStub.fns, '$child', function() {
                return FirebaseStub.fns;
            });

            return FirebaseStub;
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        Firebase = firebaseStub();
        $rootScope.currentUser = {
            pid: 'projectId',
            uid: 'userId',
            md5Hash: 'hash',
            username: 'username'
        };

        ChatController = $controller('ChatController', {
            $scope: scope,
            User: User,
        });
    }));

    it('should be defined', function() {
        expect(ChatController).toBeDefined();
    });

    describe('$scope.user', function() {
        beforeEach(function() {
            spyOn(User, 'find').and.callThrough();
            scope.init();
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
            // scope.messages.$add = jasmine.createSpy('$add');
            scope.init();
            var fakeEvent = {
                keyCode: 13,
                preventDefault: function() {
                    return;
                }
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