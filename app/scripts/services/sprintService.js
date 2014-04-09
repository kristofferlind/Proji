angular.module('projiApp')

.factory('Sprint', function($firebase, FBURL, $q) {
    'use strict';
    var ref = new Firebase(FBURL + '/sprints'),
        sprints = $firebase(ref),
        Sprint = {
            all: function(projectId) {
                return sprints.$child(projectId);
            },
            create: function(projectId, sprint) {
                return sprints.$child(projectId).$add(sprint);
            },
            delete: function(projectId, sprintId) {
                return sprints.$child(projectId).$remove(sprintId);
            },
            find: function(projectId, sprintId) {
                return sprints.$child(projectId).$child(sprintId);
            },
            getCurrent: function(projectId) {
                var now = new Date().getTime(),
                    d = $q.defer();

                ref.child('/' + projectId).once('value', function(sprintSnapshot) {
                    var sprintData = sprintSnapshot;

                    sprintData.forEach(function(data) {
                        var start = new Date(data.child('start').val()),
                            end = new Date(data.child('end').val());

                        start.setHours(0);
                        start.setMinutes(0);
                        end.setHours(23);
                        end.setMinutes(59);

                        start = start.getTime();
                        end = end.getTime();

                        if (now > start && now < end) {
                            d.resolve(data.name());
                        }
                    });
                });
                return d.promise;
            },
            update: function(projectId, sprintId, sprint) {
                return sprints.$child(projectId).$child(sprintId).$set(sprint);
            }
        };

    return Sprint;
});