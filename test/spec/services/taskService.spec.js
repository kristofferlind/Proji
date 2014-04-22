'use strict';

describe('Service: Task', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$firebase', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));


    //No idea how to stub $firebase, reference:
    //https://github.com/firebase/angularFire-seed/blob/master/test/unit/servicesSpec.js

    var Task,
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


    beforeEach(function() {
        inject(function(_Task_) {
            Task = _Task_;
            Firebase = firebaseStub();
        });
    });

    it('should be defined', function() {
        expect(Task).toBeDefined();
    });

    describe('Task.all', function() {

        it('should be defined', function() {
            expect(Task.all).toBeDefined();
        });

        it('should request projects', function() {
            Task.all('projectId');
            expect(Firebase.fns.$child().$child).toHaveBeenCalled();
        });
    });

    describe('Task.create', function() {

        it('should be defined', function() {
            expect(Task.create).toBeDefined();
        });

        it('should make an $add call', function() {
            Task.create('projectId', 'task');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Task.delete', function() {

        it('should be defined', function() {
            expect(Task.delete).toBeDefined();
        });

        it('should make a $remove call', function() {
            Task.delete('projectId', 'taskId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Task.find', function() {

        it('should be defined', function() {
            expect(Task.find).toBeDefined();
        });

        it('should make a request', function() {
            Task.find('projectId', 'taskId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Task.update', function() {

        it('should be defined', function() {
            expect(Task.update).toBeDefined();
        });

        it('should make a $set call', function() {
            Task.update('projectId', 'taskId', 'task');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });
});