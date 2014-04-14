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
    $routeProvider
        .when('/', {
            authRequired: true,
            templateUrl: 'views/overview.html',
            controller: 'OverviewController'
        })
        .when('/login', {
            authRequired: false, // if true, must log in before viewing this page
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/project', {
            authRequired: true,
            templateUrl: 'views/project.html',
            controller: 'ProjectController'
        })
        .when('/sprint', {
            authRequired: true,
            templateUrl: 'views/sprint.html',
            controller: 'SprintController'
        })
        .when('/task', {
            authRequired: true,
            templateUrl: 'views/task.html',
            controller: 'TaskController'
        })
        .when('/project/:projectId', {
            //This route and below are from prototyping, remove as they become deprecated
            authRequired: true,
            templateUrl: 'views/projectDetails.html',
            controller: 'ProjectDetailsController'
        })
        .when('/productbacklog', {
            authRequired: true,
            templateUrl: 'views/productbacklog.html',
            controller: 'ProductBacklogController'
        })
        .when('/profile', {
            authRequired: true,
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })
        .when('/ideas', {
            authRequired: true,
            templateUrl: 'views/ideas.html',
            controller: 'IdeaController'
        })
        .when('/idea/:ideaId', {
            authRequired: true,
            templateUrl: 'views/ideaDetails.html',
            controller: 'IdeaDetailsController'
        })
        .when('/chat', {
            authRequired: true,
            templateUrl: 'views/chat.html',
            controller: 'ChatController'
        })
        .otherwise({
            redirectTo: '/'
        });
});