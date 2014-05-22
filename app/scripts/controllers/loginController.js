/*
    Controller for loginpage
    view: /login
*/

angular.module('projiApp')

.controller('LoginController', function($scope, simpleLogin, $location, User) {
    'use strict';

    //Initialization values
    $scope.pass = null;
    $scope.err = null;
    $scope.email = null;
    $scope.confirm = null;
    $scope.createMode = false;

    //Log in
    $scope.loginPassword = function(cb) {
        $scope.err = null;
        //check for email
        if (!$scope.email) {
            $scope.err = 'Please enter an email address';
            //check for password
        } else if (!$scope.pass) {
            $scope.err = 'Please enter a password';
        } else {
            //call login, user = user object (uid, md5..)
            simpleLogin.loginPassword($scope.email, $scope.pass, function(err, user) {
                if (err) {
                    //change errormessage (figure out a better way to handle this)
                    if (err.message === 'FirebaseSimpleLogin: The specified password is incorrect.') {
                        $scope.err = 'Password is incorrect';
                    } else {
                        $scope.err = err ? err + '' : null;
                    }
                }
                //check for errors
                if (!err && cb) {
                    cb(user);
                }
            });
        }
    };

    //Log out
    $scope.logout = simpleLogin.logout;

    //Register
    $scope.createAccount = function() {
        //local validation
        function assertValidLoginAttempt() {
            //check for email
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
                //check for pass
            } else if (!$scope.pass) {
                $scope.err = 'Please enter a password';
                //compare pass & confirm
            } else if ($scope.pass !== $scope.confirm) {
                $scope.err = 'Passwords do not match';
                //check for username
            } else if (!$scope.username) {
                $scope.err = 'Username required';
            }
            //return false on error
            return !$scope.err;
        }

        //clear error messages
        $scope.err = null;
        //run local validation
        if (assertValidLoginAttempt()) {
            //call create
            simpleLogin.createAccount($scope.email, $scope.pass, function(err, user) {
                if (err) {
                    //change errormessage
                    if (err.message === 'FirebaseSimpleLogin: The specified email address is already in use.') {
                        $scope.err = 'Email address is already in use';
                    } else {
                        //if err, convert to string and set errormessage otherwise null
                        $scope.err = err ? err + '' : null;
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