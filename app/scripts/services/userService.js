angular.module('projiApp')

.factory('User', function($firebase, FBURL, simpleLogin, $rootScope) {
    'use strict';
    var ref = new Firebase(FBURL + '/users'),
        users = $firebase(ref),
        User = {
            create: function(fbUser, username) {
                users[fbUser.uid] = {
                    md5Hash: fbUser.md5_hash,
                    username: username,
                    email: fbUser.email
                };

                users.$save(fbUser.uid).then(function() {
                    User.setCurrentUser(fbUser.uid);
                });
            },
            find: function(uid) {
                if (uid) {
                    return users.$child(uid);
                }
            },
            getCurrentProject: function() {
                // return '-JJdmHAigkMeV1JBbYc7';
                // console.log(users);
                // console.log($rootScope.currentUser.pid);
                return $rootScope.currentUser.pid;
                // return users.$child($rootScope.currentUser.uid).projectId;
                // $rootScope.currentUser.pid.then(function(data) {
                //     return data;
                // });

                // var isSet = function() {
                //     if ($rootScope.currentUser.pid !== undefined) {
                //         return $rootScope.currentUser.pid;
                //     } else {
                //         $timeout(isSet, 100);
                //     }
                // };

                // $timeout(isSet, 100);
            },
            getCurrentUser: function() {
                // return 'simplelogin:11';
                return users.$child($rootScope.currentUser.uid);

                // var d = $q.defer();

                // var cuser = users.$child($rootScope.currentUser.uid);
                // $timeout(function() {-
                //     d.resolve(cuser);
                // });
                // return d.promise;

                // var d = $q.defer();
                // users.$child($rootScope.currentUser.uid).then(function(data) {
                //     d.resolve(data);
                // });

                // return d.promise;
            },
            setCurrentProject: function(uid, projectId) {
                $rootScope.currentUser.pid = projectId;
                return users.$child(uid).$child('projectId').$set(projectId);
            },
            setCurrentUser: function(fbUser) {
                // $rootScope.currentUser = fbUser.uid;
                // var pid = pid || users.$child(fbUser.uid).projectId;

                $rootScope.currentUser = {
                    email: fbUser.email,
                    uid: fbUser.uid,
                    md5Hash: fbUser.md5_hash,
                    pid: users.$child(fbUser.uid).projectId,
                    username: users.$child(fbUser.uid).username
                };

                // $timeout();
            },
            update: function(uid, user) {
                return users.$child(uid).$update(user);
            }
        };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, fbUser) {
        User.setCurrentUser(fbUser);
        // $timeout();
    });

    $rootScope.$on('firebaseSimpleLogin:logout', function() {
        delete $rootScope.currentUser;
    });


    return User;
});