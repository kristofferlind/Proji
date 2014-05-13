// 'use strict';

// ddescribe('Controller: DocumentEditController', function() {
//     beforeEach(function() {
//         module('projiApp');
//     });

//     beforeEach(module(function($provide) {
//         $provide.value('Firebase', firebaseStub());
//         $provide.value('$firebase', firebaseStub());
//         $provide.value('$firebaseSimpleLogin', authStub());
//     }));

//     var DocumentEditController, scope, q, d, CodeMirror,
//         User = {
//             getUserId: function() {
//                 d = q.defer();
//                 return d.promise;
//             },
//             getProjectId: function() {
//                 d = q.defer();
//                 return d.promise;
//             }
//         },
//         customSpy = function(obj, method, fn) {
//             obj[method] = fn;
//             spyOn(obj, method).and.callThrough();
//         },
//         stub = function() {
//             var out = {};
//             angular.forEach(arguments, function(method) {
//                 out[method] = jasmine.createSpy();
//             });
//             return out;
//         },
//         authStub = function() {
//             var AuthStub = function() {
//                 return AuthStub.fns;
//             };
//             AuthStub.fns = stub('$login', '$logout');
//             return AuthStub;
//         },
//         firebaseStub = function() {
//             var FirebaseStub = function() {
//                 return FirebaseStub.fns;
//             };

//             FirebaseStub.fns = {
//                 $add: jasmine.createSpy('$add'),
//                 $remove: jasmine.createSpy('$remove'),
//                 callbackVal: null
//             };

//             customSpy(FirebaseStub.fns, '$set', function(value, cb) {
//                 cb && cb(FirebaseStub.fns.callbackVal);
//             });

//             customSpy(FirebaseStub.fns, '$child', function() {
//                 return FirebaseStub.fns;
//             });

//             return FirebaseStub;
//         };


//     beforeEach(inject(function($controller, $rootScope, $q) {
//         q = $q;
//         scope = $rootScope.$new();
//         $rootScope.currentUser = {
//             pid: 'projectId',
//             uid: 'userId',
//             md5Hash: 'hash',
//             username: 'username'
//         };
//         CodeMirror = {};
//         DocumentEditController = $controller('DocumentEditController', {
//             $scope: scope,
//             User: User
//         });
//     }));

//     it('should be defined', function() {
//         expect(DocumentEditController).toBeDefined();
//     });

//     it('firepad should be a directive');
// });