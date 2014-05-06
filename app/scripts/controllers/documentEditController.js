angular.module('projiApp')

.controller('DocumentEditController', function(FBURL, User, $scope, $routeParams, $rootScope) {
    'use strict';

    var userId = $rootScope.currentUser.uid,
        projectId = $rootScope.currentUser.pid;

    //// Initialize Firebase.
    var firepadRef = new Firebase(FBURL + '/firepad/' + projectId + '/' + $routeParams.documentId);

    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), {
        lineWrapping: true
    });

    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextToolbar: true,
        richTextShortcuts: true
    });

    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'), document.getElementById('userlist'), userId, user.username);

    //// Initialize contents.
    firepad.on('ready', function() {
        if (firepad.isHistoryEmpty()) {
            firepad.setHtml(
                '<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/>\n' +
                '<br/>' +
                '<div style="font-size: 18px">' +
                'Supports:<br/>' +
                '<ul>' +
                '<li>Different ' +
                '<span style="font-family: impact">fonts,</span>' +
                '<span style="font-size: 24px;"> sizes, </span>' +
                '<span style="color: blue">and colors.</span>' +
                '</li>' +
                '<li>' +
                '<b>Bold, </b>' +
                '<i>italic, </i>' +
                '<u>and underline.</u>' +
                '</li>' +
                '<li>Lists' +
                '<ol>' +
                '<li>One</li>' +
                '<li>Two</li>' +
                '</ol>' +
                '</li>' +
                '<li>Undo / redo</li>' +
                '<li>Cursor / selection synchronization.</li>' +
                '<li>And it\'s all fully collaborative!</li>' +
                '</ul>' +
                '</div>');
        }
    });
});