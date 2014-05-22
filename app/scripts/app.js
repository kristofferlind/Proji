/* jshint unused:false */

'use strict';

angular.module('projiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'angularfire.firebase',
    'angularfire.login',
    'simpleLoginTools'
])

.run(function(waitForAuth) {
    //https://gist.github.com/katowulf/7328023
})

.config(function($routeProvider) {
    //Get projectId (needs minificationsafe injection because ngMin doesn't solve it)
    var getPid = ['$q', '$timeout', 'User', '$rootScope', '$location',
        function($q, $timeout, User, $rootScope, $location) {
            var d = $q.defer(),
                tries = 0, //Make sure tries starts at 0
                isDone = function() {
                    //If user object has pid (projectId) resolve pid and broadcast that it has been resolved
                    if ($rootScope.currentUser && $rootScope.currentUser.pid) {
                        $rootScope.$broadcast('resolved');
                        d.resolve($rootScope.currentUser.pid);
                    } else {
                        //If pid is found on localstorage, resolve and broadcast
                        if (localStorage.pid) {
                            $rootScope.$broadcast('resolved');
                            d.resolve(localStorage.pid);
                        } else {
                            //If more than 10 tries have been made, there is no active projectId. Make the user pick one
                            if (tries > 9) {
                                $location.path('/project/set');
                            } else {
                                //Try again after 25ms
                                tries++;
                                $timeout(isDone, 25);
                            }
                        }
                    }
                };

            isDone();

            return d.promise;
        }
    ], //Also needs minsafe because ngMin cant handle it
        getSid = ['$rootScope', '$q', '$location', 'Sprint', '$timeout', 'Notify',
            function($rootScope, $q, $location, Sprint, $timeout, Notify) {
                var d = $q.defer(),
                    tries = 0,
                    isDone = function() {
                        //If user object has sid (sprintId) resolve
                        if ($rootScope.currentUser && $rootScope.currentUser.sid) {
                            d.resolve($rootScope.currentUser.sid);
                        } else {
                            //If user object has pid..
                            if ($rootScope.currentUser && $rootScope.currentUser.pid) {
                                //Fetch sprintId
                                Sprint.getCurrent($rootScope.currentUser.pid).then(function(sid) {
                                    //If sprintId is found, save it on user object+localstorage and resolve
                                    if (sid) {
                                        $rootScope.currentUser.sid = sid;
                                        localStorage.sid = sid;
                                        d.resolve(sid);
                                    } else {
                                        //Otherwise notify user and redirect to plan project
                                        Notify.warning('There is no sprint for the current date.');
                                        $location.path('/project');
                                    }
                                }, function() {
                                    //If fetching sprintId fails, notify user and redirect to plan project
                                    Notify.warning('There is no sprint for the current date.');
                                    $location.path('/project');
                                });
                            } else {
                                //Try 10 times, and notify user and redirect if it still fails
                                if (tries > 9) {
                                    Notify.warning('There is no sprint for the current date.');
                                    $location.path('/project');
                                } else {
                                    tries++;
                                    $timeout(isDone, 25);
                                }
                            }
                        }
                    };

                isDone();

                return d.promise;
            }
        ];

    $routeProvider
        .when('/', {
            authRequired: true,
            templateUrl: 'views/overview.html',
            controller: 'OverviewController',
            resolve: {
                pid: getPid,
                // slow: function($q, $timeout) {
                //     var d = $q.defer();
                //     $timeout(function() {
                //         d.resolve();
                //     }, 5000);
                //     return d.promise;
                // }
            }
        })
        .when('/login', {
            authRequired: false, // if true, must log in before viewing this page
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/project', {
            authRequired: true,
            templateUrl: 'views/project.html',
            controller: 'ProjectController',
            resolve: {
                pid: getPid
            }
        })
        .when('/project/set', {
            authRequired: true,
            templateUrl: 'views/projectSet.html',
            controller: 'ProjectSetController'
        })
        .when('/sprint', {
            authRequired: true,
            templateUrl: 'views/sprint.html',
            controller: 'SprintController',
            resolve: {
                pid: getPid,
                sid: getSid
            }
        })
        .when('/task', {
            authRequired: true,
            templateUrl: 'views/task.html',
            controller: 'TaskController',
            resolve: {
                pid: getPid,
                sid: getSid
            }
        })
        .when('/document', {
            authRequired: true,
            templateUrl: 'views/document.html',
            controller: 'DocumentController',
            resolve: {
                pid: getPid
            }
        })
        .when('/document/:documentId', {
            authRequired: true,
            templateUrl: 'views/documentEdit.html',
            controller: 'DocumentEditController',
            resolve: {
                pid: getPid
            }
        })
        .when('/profile', {
            authRequired: true,
            templateUrl: 'views/profile.html',
            controller: 'ProfileController',
            resolve: {
                pid: getPid
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});