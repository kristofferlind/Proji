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
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                authRequired: true,
                templateUrl: 'views/main.html',
                controller: 'MainController'
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
            .when('/project/:projectId', {
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
            .otherwise({
                redirectTo: '/'
            });
    });