'use strict';

angular.module('projiApp')

.controller('LoginController', function($scope, simpleLogin, $location, User) {
    $scope.pass = null;
    $scope.err = null;
    $scope.email = null;
    $scope.confirm = null;
    $scope.createMode = false;
    $scope.loginPassword = function(cb) {
        $scope.err = null;
        if (!$scope.email) {
            $scope.err = 'Please enter an email address';
        } else if (!$scope.pass) {
            $scope.err = 'Please enter a password';
        } else {
            simpleLogin.loginPassword($scope.email, $scope.pass, function(err, user) {
                if (err) {
                    $scope.err = err ? err + '' : null;
                    if (err.message === 'FirebaseSimpleLogin: The specified password is incorrect.') {
                        $scope.err = 'Password is incorrect';
                    }
                }
                if (!err && cb) {
                    cb(user);
                }
            });
        }
    };

    $scope.logout = simpleLogin.logout;

    $scope.createAccount = function() {
        function assertValidLoginAttempt() {
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if (!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else if ($scope.pass !== $scope.confirm) {
                $scope.err = 'Passwords do not match';
            } else if (!$scope.username) {
                $scope.err = 'Username required';
            }
            return !$scope.err;
        }

        $scope.err = null;
        if (assertValidLoginAttempt()) {
            simpleLogin.createAccount($scope.email, $scope.pass, function(err, user) {
                if (err) {
                    $scope.err = err ? err + '' : null;
                    if (err.message === 'FirebaseSimpleLogin: The specified email address is already in use.') {
                        $scope.err = 'Email address is already in use';
                    }
                } else {
                    // must be logged in before I can write to my profile
                    $scope.loginPassword(function() {
                        User.create(user, $scope.username);
                        // console.log($scope.username);
                        // simpleLogin.createProfile(user.uid, user.email);
                        $location.path('/project/set');
                    });
                }
            });
        }
    };

});