angular.module('projiApp')

.factory('Idea', function($firebase, FBURL) {
    'use strict';
    var ref = new Firebase(FBURL + '/ideas'),
        ideas = $firebase(ref),
        Idea = {
            all: function(projectId) {
                return ideas.$child(projectId);
            },
            create: function(projectId, idea) {
                return ideas.$child(projectId).$add(idea);
            },
            delete: function(projectId, ideaId) {
                return ideas.$child(projectId).$remove(ideaId);
            },
            find: function(projectId, ideaId) {
                return ideas.$child(projectId).$child(ideaId);
            },
            update: function(projectId, ideaId, idea) {
                return ideas.$child(projectId).$child(ideaId).$set(idea);
            },
            //Comments
            getComment: function(projectId, ideaId, commentId) {
                return ideas.$child(projectId).$child(ideaId).$child('comments').$child(commentId);
            },
            getComments: function(projectId, ideaId) {
                return ideas.$child(projectId).$child(ideaId).$child('comments');
            },
            addComment: function(projectId, ideaId, comment) {
                return ideas.$child(projectId).$child(ideaId).$child('comments').$add(comment);
            },
            removeComment: function(projectId, ideaId, commentId) {
                return ideas.$child(projectId).$child(ideaId).$child('comments').$remove(commentId);
            },
            //Voting for ideas
            voteUp: function(projectId, ideaId, userId) {
                ideas.$child(projectId).$child(ideaId).$child('score').$transaction(function(score) {
                    if (score === undefined) {
                        return 1;
                    } else {
                        return score + 1;
                    }
                });
            },
            voteDown: function(projectId, ideaId, userId) {
                ideas.$child(projectId).$child(ideaId).$child('score').$transaction(function(score) {
                    if (score === undefined) {
                        return -1;
                    } else {
                        return score - 1;
                    }
                });
            }
        };

    return Idea;
});