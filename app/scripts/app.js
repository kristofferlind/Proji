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
    var getPid = function($q, $timeout, User, $rootScope, $firebaseSimpleLogin, $location) {
        var d = $q.defer(),
            tries = 0,
            isDone = function() {
                if ($rootScope.currentUser && $rootScope.currentUser.pid) {
                    $rootScope.$broadcast('resolved');
                    d.resolve($rootScope.currentUser.pid);
                } else {
                    if (localStorage.pid) {
                        d.resolve(localStorage.pid);
                    } else {
                        if (tries > 10) {
                            $location.path('/project/set');
                        } else {
                            tries++;
                            $timeout(isDone, 25);
                        }
                    }
                }
            };

        isDone();

        return d.promise;
    }, getSid = function($rootScope, $q, $location, Sprint, $timeout) {
            var d = $q.defer(),
                tries = 0,
                isDone = function() {
                    if ($rootScope.currentUser && $rootScope.currentUser.sid) {
                        d.resolve($rootScope.currentUser.sid);
                    } else {
                        if ($rootScope.currentUser && $rootScope.currentUser.pid) {
                            Sprint.getCurrent($rootScope.currentUser.pid).then(function(sid) {
                                $rootScope.currentUser.sid = sid;
                                localStorage.sid = sid;
                                d.resolve(sid);
                            });
                        } else {
                            if (tries > 10) {
                                $location.path('/project');
                            } else {
                                console.log('try again');
                                tries++;
                                $timeout(isDone, 25);
                            }
                        }
                    }
                };

            isDone();

            return d.promise;
        };

    $routeProvider
        .when('/', {
            authRequired: true,
            templateUrl: 'views/overview.html',
            controller: 'OverviewController',
            resolve: {
                pid: getPid
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




//.when('/project/:projectId', {
//This route and below are from prototyping, remove as they become deprecated
//     authRequired: true,
//     templateUrl: 'views/projectDetails.html',
//     controller: 'ProjectDetailsController'
// })
// .when('/productbacklog', {
//     authRequired: true,
//     templateUrl: 'views/productbacklog.html',
//     controller: 'ProductBacklogController'
// })
// .when('/ideas', {
//     authRequired: true,
//     templateUrl: 'views/ideas.html',
//     controller: 'IdeaController'
// })
// .when('/idea/:ideaId', {
//     authRequired: true,
//     templateUrl: 'views/ideaDetails.html',
//     controller: 'IdeaDetailsController'
// })
// .when('/chat', {
//     authRequired: true,
//     templateUrl: 'views/chat.html',
//     controller: 'ChatController'
// })