'use strict';

describe('Service: Project', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$firebase', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

    var Project,
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
        inject(function(_Project_) {
            Project = _Project_;
            Firebase = firebaseStub();
        });
    });

    it('should be defined', function() {
        expect(Project).toBeDefined();
    });

    describe('Project.all', function() {

        it('should be defined', function() {
            expect(Project.all).toBeDefined();
        });

        it('should request projects');
    });

    describe('Project.create', function() {

        it('should be defined', function() {
            expect(Project.create).toBeDefined();
        });

        it('should call create');
    });

    describe('Project.delete', function() {

        it('should be defined', function() {
            expect(Project.delete).toBeDefined();
        });
    });

    describe('Project.find', function() {

        it('should be defined', function() {
            expect(Project.find).toBeDefined();
        });

        it('should call find', function() {
            Project.find('projectId');
            expect(Firebase.fns.$child().$child).toHaveBeenCalled();
        });

        it('should return no active project if no projectId is given');
    });

    describe('Project.getCurrent', function() {

        it('should be defined', function() {
            expect(Project.getCurrent).toBeDefined();
        });

        it('should call getCurrent', function() {
            Project.getCurrent();
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Project.getUsers', function() {

        it('should be defined', function() {
            expect(Project.getUsers).toBeDefined();
        });

        it('should call getUsers', function() {
            Project.getUsers();
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Project.removeUser', function() {

        it('should be defined', function() {
            expect(Project.removeUser).toBeDefined();
        });

        it('should call removeUser', function() {
            Project.removeUser();
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Project.update', function() {

        it('should be defined', function() {
            expect(Project.update).toBeDefined();
        });

        it('should call update', function() {
            Project.update();
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });
});