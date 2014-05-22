/*
    Controller for navigation
    view: navigationpanel
*/

angular.module('projiApp')

.controller('NavigationController', function($scope, $location, Project, User, $rootScope, Sprint) {
    'use strict';

    /*  
        Handles updating of the view when stuff changes in other views, this should be solved by
        controller inheritance instead, keeping global variables in a rootcontroller should work.
        Keeping track of events is a rather crappy solution. angular-ui ui-router might be a great solution
    */
    var updateView = function() {
        //make sure pid has been set, pid = projectId
        if ($rootScope.currentUser && $rootScope.currentUser.pid) {
            $scope.user = User.find($rootScope.currentUser.uid);
            $scope.project = Project.find($rootScope.currentUser.pid);
        }
        //make sure both pid and sid exists, pid = projectId, sid = sprintId (should rewrite this to actually be projectId and sprintId)
        if ($rootScope.currentUser && $rootScope.currentUser.pid && $rootScope.currentUser.sid) {
            $scope.sprint = Sprint.find($rootScope.currentUser.pid, $rootScope.currentUser.sid);
        }
    }, loggedIn = function() {
            $scope.loggedIn = true;
            updateView();
        }, loggedOut = function() {
            $scope.loggedIn = false;
        };

    /*
        All these events shouldn't be required, actually none of them.. 
        but just watching the user object should suffice
    */

    //run update when user object changes
    $rootScope.$watch($rootScope.currentUser, updateView);
    //run on login
    $rootScope.$on('$firebaseSimpleLogin:login', loggedIn);
    //run on logout
    $rootScope.$on('$firebaseSimpleLogin:logout', loggedOut);
    //event broadcasted from app.js on resolve of projectId or sprintId
    $rootScope.$on('resolved', updateView);
    //event broadcasted from projectservice on activation of project
    $rootScope.$on('projectChange', updateView);

    //init, only used in testing (this is kind of cheating..)
    $scope.init = function() {
        updateView();
    };
});