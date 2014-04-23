'use strict';

describe('Service: User', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$firebase', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

    var User,
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
                $transaction: jasmine.createSpy('$transaction'),
                $update: jasmine.createSpy('$update')
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
        inject(function(_User_) {
            User = _User_;
            Firebase = firebaseStub();
        });
    });

    it('should be defined', function() {
        expect(User).toBeDefined();
    });

    describe('User.addProject', function() {

        it('should be defined', function() {
            expect(User.addProject).toBeDefined();
        });

        it('should call addProject', function() {
            User.addProject('projectId', 'userId');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('User.create', function() {

        it('should be defined', function() {
            expect(User.create).toBeDefined();
        });

        it('should define a user correctly');

        it('should save user');

        it('should call User.setCurrentUser');
    });

    describe('User.getCurrentProject', function() {

        it('should be defined', function() {
            expect(User.getCurrentProject).toBeDefined();
        });

        it('should call getCurrentProject', function() {
            User.getCurrentProject('userId');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('User.getUserId', function() {

        it('should be defined', function() {
            expect(User.getUserId).toBeDefined();
        });

        it('should return promise which resolves to userId when done');
    });

    describe('User.getProjectId', function() {

        it('should be defined', function() {
            expect(User.getProjectId).toBeDefined();
        });

        it('should make a db call');

        it('should resolve when loaded');

        it('should return promise which resolves to projectId when done');
    });

    describe('User.getCurrentProject', function() {

        it('should be defined', function() {
            expect(User.getCurrentProject).toBeDefined();
        });

        it('should make a db call');
        // it('should make a db call', function() {
        //     User.getCurrentUser();
        //     //set rootscope currentuser uid
        //     expect(Firebase.fns.$child().$child).toHaveBeenCalled();
        // });
    });

    describe('User.getUsername', function() {

        it('should be defined', function() {
            expect(User.getUsername).toBeDefined();
        });

        it('should return user.username if it exists');

        it('should make a db call if it doesnt');

        it('should return a username');
    });

    describe('User.getProjects', function() {

        it('should be defined', function() {
            expect(User.getProjects).toBeDefined();
        });

        it('should call getCurrentProject', function() {
            User.getProjects('userId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('User.setCurrentProject', function() {

        it('should be defined', function() {
            expect(User.setCurrentProject).toBeDefined();
        });

        it('should make a db call', function() {
            User.setCurrentProject('userId', 'projectId');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('User.setCurrentUser', function() {

        it('should be defined', function() {
            expect(User.setCurrentUser).toBeDefined();
        });

        it('should setup a correct user on rootscope.currentuser');
    });

    describe('User.update', function() {

        it('should be defined', function() {
            expect(User.update).toBeDefined();
        });

        it('should make a db call', function() {
            User.update('userId', 'user');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('User.startTask', function() {

        it('should be defined', function() {
            expect(User.startTask).toBeDefined();
        });

        it('should make a db call', function() {
            User.startTask('userId', 'taskId', 'task');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('User.getTask', function() {

        it('should be defined', function() {
            expect(User.getTask).toBeDefined();
        });

        it('should make a db call', function() {
            User.getTask('userId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('User.stopTask', function() {

        it('should be defined', function() {
            expect(User.stopTask).toBeDefined();
        });

        it('should make a db call', function() {
            User.stopTask('userId', 'taskId', 'task');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });

        it('should save changes(sprint backlog, product backlog)');
    });

    describe('User.finnishTask', function() {

        it('should be defined', function() {
            expect(User.finnishTask).toBeDefined();
        });

        it('should make a db call', function() {
            User.finnishTask('userId', 'taskId', 'task');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });

        it('should save changes(sprint backlog, product backlog)');

        it('should change status of task(everywhere)');
    });
});