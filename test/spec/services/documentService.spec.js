'use strict';

describe('Service: Document', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$firebase', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

    var Document,
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
        inject(function(_Document_) {
            Document = _Document_;
            Firebase = firebaseStub();
        });
    });

    it('should be defined', function() {
        expect(Document).toBeDefined();
    });

    describe('Document.all', function() {

        it('should be defined', function() {
            expect(Document.all).toBeDefined();
        });

        it('should request Documents', function() {
            Document.all('projectId');
            expect(Firebase.fns.$child().$child).toHaveBeenCalled();
        });
    });

    describe('Document.create', function() {

        it('should be defined', function() {
            expect(Document.create).toBeDefined();
        });

        it('should call create', function() {
            Document.create('projectId', 'document');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Document.delete', function() {

        it('should be defined', function() {
            expect(Document.delete).toBeDefined();
        });

        it('should call delete', function() {
            Document.delete('projectId', 'documentId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });

        it('should make two calls');
    });

    describe('Document.find', function() {

        it('should be defined', function() {
            expect(Document.find).toBeDefined();
        });

        it('should call find', function() {
            Document.find('projectId', 'documentId');
            expect(Firebase.fns.$child().$child().$child).toHaveBeenCalled();
        });
    });

    describe('Document.update', function() {

        it('should be defined', function() {
            expect(Document.update).toBeDefined();
        });

        it('should call update', function() {
            Document.update('projectId', 'documentId', 'document');
            expect(Firebase.fns.$child().$child().$child().$child).toHaveBeenCalled();
        });
    });
});