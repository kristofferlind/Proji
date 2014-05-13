'use strict';

describe('Service: Idea', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$firebase', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

    var Idea, q,
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
                $set: function() {
                    var d = q.defer();
                    d.resolve(FirebaseStub.fns.callbackVal);
                    return d.promise;
                },
                userId: 'userId'
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
        inject(function(_Idea_, $q) {
            Idea = _Idea_;
            Firebase = firebaseStub();
            q = $q;
        });
    });

    it('should be defined', function() {
        expect(Idea).toBeDefined();
    });

    describe('Idea.all', function() {

        it('should be defined', function() {
            expect(Idea.all).toBeDefined();
        });

        it('should request ideas', function() {
            Idea.all('projectId');
            expect(Firebase.fns.$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.create', function() {

        it('should be defined', function() {
            expect(Idea.create).toBeDefined();
        });

        it('should call create', function() {
            Idea.create('projectId', 'idea');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.delete', function() {

        it('should be defined', function() {
            expect(Idea.delete).toBeDefined();
        });

        it('should call delete', function() {
            Idea.delete('projectId', 'ideaId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.find', function() {

        it('should be defined', function() {
            expect(Idea.find).toBeDefined();
        });

        it('should request find', function() {
            Idea.find('projectId', 'ideaId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.update', function() {

        it('should be defined', function() {
            expect(Idea.update).toBeDefined();
        });

        it('should call update', function() {
            Idea.update('projectId', 'ideaId', 'idea');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.getComment', function() {

        it('should be defined', function() {
            expect(Idea.getComment).toBeDefined();
        });

        it('should request getComment', function() {
            Idea.getComment('projectId', 'ideaId', 'commentId');
            expect(Firebase.fns.$child().$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.getComments', function() {

        it('should be defined', function() {
            expect(Idea.getComments).toBeDefined();
        });

        it('should request getComments', function() {
            Idea.getComments('projectId', 'ideaId');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.addComment', function() {

        it('should be defined', function() {
            expect(Idea.addComment).toBeDefined();
        });

        it('should call addComment', function() {
            Idea.addComment('projectId', 'ideaId', 'comment');
            expect(Firebase.fns.$child().$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.removeComment', function() {

        it('should be defined', function() {
            expect(Idea.removeComment).toBeDefined();
        });

        it('should request removeComment', function() {
            Idea.removeComment('projectId', 'ideaId', 'commentId');
            expect(Firebase.fns.$child().$child().$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Idea.voteUp', function() {

        it('should be defined', function() {
            expect(Idea.voteUp).toBeDefined();
        });

        it('should call voteUp', function() {
            Idea.voteUp('projectId', 'ideaId', 'userId');
            expect(Firebase.fns.$child().$child().$child().$child().$child).toHaveBeenCalled();
        });

        it('should remove vote if user has already voted');
    });

    describe('Idea.voteDown', function() {

        it('should be defined', function() {
            expect(Idea.voteDown).toBeDefined();
        });

        it('should call voteDown', function() {
            Idea.voteDown('projectId', 'ideaId', 'userId');
            expect(Firebase.fns.$child().$child().$child().$child().$child).toHaveBeenCalled();
        });

        it('should remove vote if user has already voted');
    });
});