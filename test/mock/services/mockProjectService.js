angular.module('projiMocks', [])

.factory('mockProject', function() {
    'use strict';
    var projectData = {
        name: 'name',
        description: 'description'
    },
        Project = {
            addUser: function() {},
            all: function() {},
            create: function() {},
            delete: function() {},
            find: function() {
                return projectData;
            },
            getCurrent: function() {},
            getUsers: function() {},
            removeUser: function() {},
            update: function() {}
        };
    return Project;
});