angular.module('projiApp')

.controller('RootController', function() { //$scope, $rootScope, $timeout, User) {
    'use strict';

    // User.getUserId().then(function(uid) {
    //     $scope.userId = uid;
    //     User.getProjectId(uid).then(function(pid) {
    //         $scope.projectId = pid;
    //     });
    // });


    // console.log(User.getUserId());

    // User.getUserId().then(function(data) {
    //     console.log(data);
    // });

    // $getCurrentUser().then(function(userdata) {
    //     console.log(userdata);
    //     $scope.userId = userdata.uid;
    // });


    // var isDone = function() {
    //     if ($rootScope.currentUser !== undefined) {
    //         $scope.userId = $rootScope.currentUser.uid;
    //         // $scope.projectId = $rootScope.currentUser.pid;
    //         console.log($scope.userId);
    //     } else {
    //         $timeout(isDone, 50);
    //     }
    // };

    // isDone();

    // User.getProjectId().then(function(data) {
    //     console.log(data);
    // });

    // $scope.test = 'test';
});