'use strict';

//Could've just pasted the code from https://github.com/firebase/angularFire-seed/blob/master/test/unit/servicesSpec.js
//but i'm going to do a rewrite to gain a better understanding.
//

var simpleLogin, profileCreator, $q, $timeout, $firebaseSimpleLogin, firebaseRef, $location, d,
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

        customSpy(FirebaseStub.fns, 'set', function(value, cb) {
            cb && cb(FirebaseStub.fns.callbackVal);
        });

        customSpy(FirebaseStub.fns, '$child', function() {
            return FirebaseStub.fns;
        });

        return FirebaseStub;
    },
    reject = function($q, error) {
        var def = $q.defer();
        def.reject(error);
        return def.promise;
    },
    resolve = function($q, value) {
        var def = $q.defer();
        def.resolve(value);
        return def.promise;
    },
    flush = function(timeout) {
        try {
            timeout.flush();
        } catch (e) {}
    },
    ErrorWithCode = function(code, message) {
        this.code = code,
        this.message = message;
    };

ErrorWithCode.prototype.toString = function() {
    return this.message;
};


describe('Service: simpleLogin', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$location', stub('path'));
        $provide.value('firebaseRef', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

    beforeEach(function() {
        inject(function(_simpleLogin_, _$q_, _$timeout_, _$firebaseSimpleLogin_, _firebaseRef_, _profileCreator_) {
            simpleLogin = _simpleLogin_;
            Firebase = firebaseStub();
            $q = _$q_;
            $timeout = _$timeout_;
            $firebaseSimpleLogin = _$firebaseSimpleLogin_;
            firebaseRef = _firebaseRef_;
            $location = stub('path');
            profileCreator = _profileCreator_;
        });
    });

    it('should be defined', function() {
        expect(simpleLogin).toBeDefined();
    });

    describe('simpleLogin.loginPassword', function() {

        it('should be defined', function() {
            expect(simpleLogin.loginPassword).toBeDefined();
        });

        it('should return error if login fails', function() {
            var cb = jasmine.createSpy('cb'),
                testError = reject($q, 'test_error');

            simpleLogin.init('/login');
            $firebaseSimpleLogin.fns.$login.and.returnValue(testError);
            simpleLogin.loginPassword('test@test.com', '123', cb);
            flush($timeout);
            expect(cb).toHaveBeenCalledWith('test_error');
        });

        it('should return user if login is successful', function() {
            var cb = jasmine.createSpy('cb');
            simpleLogin.init();
            $firebaseSimpleLogin.fns.$login.and.returnValue(resolve($q, {
                name: 'test'
            }));
            simpleLogin.loginPassword('test@test.com', '123', cb);

            flush($timeout);

            expect(cb).toHaveBeenCalledWith(null, {
                name: 'test'
            });


        });
    });

    describe('simpleLogin.logout', function() {

        it('should be defined', function() {
            expect(simpleLogin.logout).toBeDefined();
        });

        it('should invoke $firebaseSimpleLogin.$logout()', function() {
            simpleLogin.init('/login');
            simpleLogin.logout();
            expect($firebaseSimpleLogin.fns.$logout).toHaveBeenCalled();
        });
    });

    describe('simpleLogin.changePassword', function() {

        it('should be defined', function() {
            expect(simpleLogin.changePassword).toBeDefined();
        });

        beforeEach(function() {
            customSpy($firebaseSimpleLogin.fns, '$changePassword', function(eml, op, np, cb) {
                var def = $q.defer();
                $timeout(function() {
                    def.resolve();
                });
                return def.promise;
            });
        });

        it('should fail if old password is missing', function() {
            var cb = jasmine.createSpy('cb');
            simpleLogin.init('/login');
            simpleLogin.changePassword({
                newpass: 123,
                confirm: 123,
                callback: cb
            });
            flush($timeout);
            expect(cb).toHaveBeenCalledWith('Please enter a password');
            expect($firebaseSimpleLogin.fns.$changePassword).not.toHaveBeenCalled();
        });

        it('should fail if new password is missing', function() {
            var cb = jasmine.createSpy('cb');
            simpleLogin.init('/login');
            simpleLogin.changePassword({
                oldpass: 123,
                confirm: 123,
                callback: cb
            });
            flush($timeout);
            expect(cb).toHaveBeenCalledWith('Please enter a password');
            expect($firebaseSimpleLogin.fns.$changePassword).not.toHaveBeenCalled();
        });

        it('should fail if passwords dont match', function() {
            var cb = jasmine.createSpy('cb');
            simpleLogin.init('/login');
            simpleLogin.changePassword({
                oldpass: 123,
                newpass: 123,
                confirm: 124,
                callback: cb
            });
            flush($timeout);
            expect(cb).toHaveBeenCalledWith('Passwords do not match');
            expect($firebaseSimpleLogin.fns.$changePassword).not.toHaveBeenCalled();
        });

        it('should fail if $firebaseSimpleLogin fails', function() {
            var cb = jasmine.createSpy('cb');
            customSpy($firebaseSimpleLogin.fns, '$changePassword', function(email, op, np) {
                var def = $q.defer();
                $timeout(function() {
                    def.reject(new ErrorWithCode(123, 'errr'));
                });
                return def.promise;
            });
            simpleLogin.init('/login');
            simpleLogin.changePassword({
                oldpass: 124,
                newpass: 123,
                confirm: 123,
                callback: cb
            });
            flush($timeout);
            expect(cb.calls.argsFor(0, 0).toString()).toBe('errr');
            expect($firebaseSimpleLogin.fns.$changePassword).toHaveBeenCalled();
        });

        it('should return null if $firebaseSimpleLogin is successful', function() {
            var cb = jasmine.createSpy('cb');
            simpleLogin.init('/login');
            simpleLogin.changePassword({
                oldpass: 124,
                newpass: 123,
                confirm: 123,
                callback: cb
            });
            flush($timeout);
            expect(cb).toHaveBeenCalledWith(null);
            expect($firebaseSimpleLogin.fns.$changePassword).toHaveBeenCalled();
        });
    });

    describe('simpleLogin.createAccount', function() {

        it('should be defined', function() {
            expect(simpleLogin.createAccount).toBeDefined();
        });

        beforeEach(function() {
            customSpy($firebaseSimpleLogin.fns, '$createUser', function(email, pass) {
                var def = $q.defer();
                $timeout(function() {
                    def.resolve({
                        name: 'test'
                    });
                });
                return def.promise;
            });
        });

        it('should invoke $firebaseSimpleLogin', function() {
            simpleLogin.init('/login');
            simpleLogin.createAccount('test@test.com', '123');
            expect($firebaseSimpleLogin.fns.$createUser).toHaveBeenCalled();
        });

        it('should invoke callback if error', function() {
            var cb = jasmine.createSpy('cb');
            customSpy($firebaseSimpleLogin.fns, '$createUser', function(email, pass) {
                var def = $q.defer();
                def.reject('failed');
                return def.promise;
            });
            simpleLogin.init('/login');
            simpleLogin.createAccount('test@test.com', '123', cb);
            flush($timeout);
            expect(cb).toHaveBeenCalledWith('failed');
        });

        it('should invoke callback if successful', function() {
            var cb = jasmine.createSpy('cb');
            simpleLogin.init('/login');
            simpleLogin.createAccount('test@test.com', '123', cb);
            flush($timeout);
            expect(cb).toHaveBeenCalledWith(null, {
                name: 'test'
            });
        });
    });

    describe('simpleLogin.createProfile', function() {
        it('should be the createProfile service', function() {
            expect(simpleLogin.createProfile).toBe(profileCreator);
        });
    });
});

describe('profileCreator', function() {
    beforeEach(function() {
        module('projiApp');
    });

    beforeEach(module(function($provide) {
        $provide.value('Firebase', firebaseStub());
        $provide.value('$location', stub('path'));
        $provide.value('firebaseRef', firebaseStub());
        $provide.value('$firebaseSimpleLogin', authStub());
    }));

    beforeEach(function() {
        inject(function(_simpleLogin_, _$q_, _$timeout_, _$firebaseSimpleLogin_, _firebaseRef_, _profileCreator_) {
            simpleLogin = _simpleLogin_;
            Firebase = firebaseStub();
            $q = _$q_;
            $timeout = _$timeout_;
            $firebaseSimpleLogin = _$firebaseSimpleLogin_;
            firebaseRef = _firebaseRef_;
            $location = stub('path');
            profileCreator = _profileCreator_;
        });
    });

    it('should invoke set on Firebase', function() {
        profileCreator(123, 'test@test.com');
        flush($timeout);
        expect(firebaseRef.fns.set.calls.argsFor(0)[0]).toEqual({
            email: 'test@test.com',
            name: 'Test'
        });
    });

    it('should invoke the callback', function() {
        var cb = jasmine.createSpy('cb');
        profileCreator(456, 'test2@test2.com', cb);
        flush($timeout);
        expect(cb).toHaveBeenCalled();
    });

    it('should return any error in the callback', function() {
        var cb = jasmine.createSpy('cb');
        firebaseRef.fns.callbackVal = 'failed';
        profileCreator(789, 'test3@test3.com', cb);
        flush($timeout);
        expect(cb).toHaveBeenCalledWith('failed');
    });
});