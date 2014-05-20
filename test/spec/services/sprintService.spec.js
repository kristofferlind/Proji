'use strict';

describe('Service: Sprint', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$firebase', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

    var Sprint,
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
                callbackVal: null,
                $transaction: jasmine.createSpy('$transaction')
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
        inject(function(_Sprint_) {
            Sprint = _Sprint_;
            Firebase = firebaseStub();
        });
    });

    it('should be defined', function() {
        expect(Sprint).toBeDefined();
    });

    describe('Sprint.all', function() {

        it('should be defined', function() {
            expect(Sprint.all).toBeDefined();
        });

        it('should request sprints', function() {
            Sprint.all('projectId');
            expect(Firebase.fns.$child().$child).toHaveBeenCalled();
        });
    });

    describe('Sprint.create', function() {

        it('should be defined', function() {
            expect(Sprint.create).toBeDefined();
        });

        it('should call create', function() {
            Sprint.create('projectId', 'sprint');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Sprint.delete', function() {

        it('should be defined', function() {
            expect(Sprint.delete).toBeDefined();
        });

        it('should call delete', function() {
            Sprint.delete('projectId', 'sprintId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Sprint.find', function() {

        it('should be defined', function() {
            expect(Sprint.find).toBeDefined();
        });

        it('should call find', function() {
            Sprint.find('projectId', 'sprintId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Sprint.getCurrent', function() {

        it('should be defined', function() {
            expect(Sprint.getCurrent).toBeDefined();
        });

        it('should call getCurrent');
    });

    describe('Sprint.update', function() {

        it('should be defined', function() {
            expect(Sprint.update).toBeDefined();
        });

        it('should call update', function() {
            Sprint.update('projectId', 'sprintId', 'sprint');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Sprint.addTask', function() {

        it('should be defined', function() {
            expect(Sprint.addTask).toBeDefined();
        });

        it('should call addTask', function() {
            Sprint.addTask('projectId', 'sprintId', 'taskId', 'task');
            expect(Firebase.fns.$child().$child().$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Sprint.removeTask', function() {

        it('should be defined', function() {
            expect(Sprint.removeTask).toBeDefined();
        });

        it('should call removeTask', function() {
            Sprint.removeTask('projectId', 'sprintId', 'taskId', 'task');
            expect(Firebase.fns.$child().$child().$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Sprint.getSprintTasks', function() {

        it('should be defined', function() {
            expect(Sprint.getSprintTasks).toBeDefined();
        });

        it('should call update', function() {
            Sprint.getSprintTasks('projectId', 'sprintId');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });
});