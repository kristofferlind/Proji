angular.module('projiApp')

.controller('NavigationController', function($scope, $location, Project, User, $rootScope, $timeout) {
    'use strict';


    //Följande är ett fulhack, jag vet inte hur jag ska lösa det nu, det här fungerar tillsvidare.
    $timeout(function() {
        $scope.project = Project.find($rootScope.currentUser.pid);
    }, 5000);



    // $scope.project = Project.find('-JJdmHAigkMeV1JBbYc7');






    // var isSet = function() {
    //     try {
    //         if ($rootScope.currentUser.pid !== undefined) {
    //             $scope.project = Project.find($rootScope.currentUser.pid);
    //             $timeout();
    //         } else {
    //             $timeout(isSet, 100);
    //         }
    //     } catch (err) {

    //     }
    // };

    // $timeout(isSet, 100);


    // $scope.user = User.getCurrentUser();
    // $scope.project = Project.getCurrent();


    // $scope.user = User.find(user.uid);
    // // if (projectId) {
    // $scope.project = Project.find(projectId);
    // } else {
    //     $scope.project = {
    //         name: 'no active project'
    //     };
    //     $location.path('/project/');
    // }

    // $scope.update = function() {
    //     $scope.project = Project.find(projectId);
    // };
});