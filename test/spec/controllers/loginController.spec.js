'use strict';

describe('Controller: LoginController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var LoginController, scope, q, d,
        User = {
            create: jasmine.createSpy('create')
        },
        simpleLoginFail = {
            loginPassword: function(email, pass, callback) {
                callback('failed', 'user');
            },
            createAccount: function(email, pass, callback) {
                callback('failed', 'user');
            }
        },
        simpleLogin = {
            loginPassword: function(email, pass, callback) {
                callback(null, 'user');
            },
            logout: jasmine.createSpy('logout'),
            createAccount: function(email, pass, callback) {
                callback(null, 'user');
            }
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        LoginController = $controller('LoginController', {
            $scope: scope,
            User: User,
            simpleLogin: simpleLogin
        });
    }));

    it('should be defined', function() {
        expect(LoginController).toBeDefined();
    });

    describe('$scope.loginPassword', function() {

        it('should be defined', function() {
            expect(scope.loginPassword).toBeDefined();
        });

        it('should return error message if $scope.email is not set', function() {
            scope.email = false;
            scope.loginPassword();
            expect(scope.err).toBe('Please enter an email address');
        });

        it('should return error message if $scope.password is not set', function() {
            scope.email = true;
            scope.pass = false;
            scope.loginPassword();
            expect(scope.err).toBe('Please enter a password');
        });

        it('should call simpleLogin on success', function() {
            spyOn(simpleLogin, 'loginPassword');
            scope.email = true;
            scope.pass = true;
            scope.loginPassword();
            expect(simpleLogin.loginPassword).toHaveBeenCalled();
        });

        it('should present error if login fails', function() {
            spyOn(simpleLogin, 'loginPassword').and.callFake(simpleLoginFail.loginPassword); //.and.returnValue('failed', 'user');
            scope.email = true;
            scope.pass = true;
            scope.loginPassword();
            expect(scope.err).toEqual('failed');
        });

        it('should return user if login is successful', function() {
            spyOn(simpleLogin, 'loginPassword').and.callThrough(); //.and.returnValue('failed', 'user');
            scope.email = true;
            scope.pass = true;
            scope.loginPassword();
            expect(scope.err).toEqual(null);
        });
    });

    it('$scope.logout = simpleLogin.logout', function() {
        scope.logout();
        expect(simpleLogin.logout).toHaveBeenCalled();
    });

    describe('$scope.createAccount', function() {
        describe('assertValidLoginAttempt()', function() {

            it('should present an error if email is not set', function() {
                scope.email = false;
                scope.createAccount();
                expect(scope.err).toEqual('Please enter an email address');
            });

            it('should present an error if password is not set', function() {
                scope.email = true;
                scope.pass = false;
                scope.createAccount();
                expect(scope.err).toEqual('Please enter a password');
            });

            it('should present an error if passwords do not match', function() {
                scope.email = true;
                scope.pass = true;
                scope.confirm = false;
                scope.createAccount();
                expect(scope.err).toEqual('Passwords do not match');
            });

            it('should present an error if username is not set', function() {
                scope.email = true;
                scope.pass = true;
                scope.confirm = true;
                scope.username = false;
                scope.createAccount();
                expect(scope.err).toEqual('Username required');
            });

            it('should present no error if data is valid', function() {
                scope.email = true;
                scope.pass = true;
                scope.confirm = true;
                scope.username = true;
                scope.createAccount();
                expect(scope.err).toEqual(null);
            });
        });

        it('should present an error if simpleLogin.createAccount fails', function() {
            spyOn(simpleLogin, 'createAccount').and.callFake(simpleLoginFail.createAccount);
            scope.email = true;
            scope.pass = true;
            scope.confirm = true;
            scope.username = true;
            scope.createAccount();
            expect(scope.err).toEqual('failed');
        });

        it('should call User.create if creation is successful', function() {
            scope.email = true;
            scope.pass = true;
            scope.confirm = true;
            scope.username = true;
            scope.createAccount();
            expect(User.create).toHaveBeenCalled();
        });
        it('..with user, username', function() {
            scope.email = true;
            scope.pass = true;
            scope.confirm = true;
            scope.username = true;
            scope.createAccount();
            expect(User.create).toHaveBeenCalledWith('user', true);
        });
    });
});