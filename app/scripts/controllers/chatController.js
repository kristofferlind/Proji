/*  Controller for chat
    View: chat (chatpanel)
    A quick implementation of a chat, break out to service as it grows more complex
*/

angular.module('projiApp')

.controller('ChatController', function($scope, $rootScope, User, $firebase, FBURL) {
    'use strict';

    /*  
        Handles updating of the view when stuff changes in other views, this should be solved by
        controller inheritance instead, keeping global variables in a rootcontroller should work.
        Keeping track of events is a rather crappy solution. angular-ui ui-router might be a great solution
    */
    var updateView = function() {
        //currentUser is a user object on rootscope, pid = projectId
        if ($rootScope.currentUser && $rootScope.currentUser.pid) {
            $scope.messages = $firebase(new Firebase(FBURL + '/chat/' + $rootScope.currentUser.pid + '/messages'));
            //currentUser doesn't have all needed props so we fetch the real object, uid = userId
            $scope.user = User.find($rootScope.currentUser.uid);

            $scope.message = {
                md5Hash: $rootScope.currentUser.md5Hash,
                uid: $rootScope.currentUser.uid,
                username: $scope.user.username,
                text: ''
            };

            $scope.sendMessage = function($event) {
                // if enter & shift
                if ($event.keyCode === 13 && $event.shiftKey) {
                    return false;
                } else {
                    //if enter & not shift
                    if ($event.keyCode === 13 && !$event.shiftKey) {
                        //empty messages are kind of useless
                        if ($scope.message.text === '') {
                            $event.preventDefault(); //we dont want a newline in this case
                            return false;
                        }
                        $scope.message.username = $scope.user.username;
                        $event.preventDefault(); //no newline
                        //add message to firebase
                        $scope.messages.$add($scope.message);
                        //clear input field
                        $scope.message.text = '';
                    }
                }
            };
        }
    },
        loggedIn = function() {
            $scope.loggedIn = true; //not used
            updateView(); //update on logging in
        }, loggedOut = function() {
            $scope.loggedIn = false; //not used
        };

    $rootScope.$watch($rootScope.currentUser, updateView); //update when user object changes
    $rootScope.$on('$firebaseSimpleLogin:login', loggedIn); //update on login
    $rootScope.$on('$firebaseSimpleLogin:logout', loggedOut);
    $rootScope.$on('resolved', updateView); //emitted when projectId or sprintId is resolved
    $rootScope.$on('projectChange', updateView); //emitted when a new project is activated

    //init, this is only used in testing.. figure out some other solution for this for example emitting one of the events above
    $scope.init = function() {
        updateView();
    };

    $scope.collapsed = true;
});