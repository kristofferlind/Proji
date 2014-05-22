/*
    Service: Idea
    Description: Acts as a service to manage idea data on firebase
*/

angular.module('projiApp')

.factory('Idea', function($firebase, FBURL, User) {
    'use strict';
    var ref = new Firebase(FBURL + '/ideas'),
        ideas = $firebase(ref),
        Idea = {
            //Ideas

            //Return all ideas
            all: function(projectId) {
                return ideas.$child(projectId);
            },
            //Create idea
            create: function(projectId, idea) {
                return ideas.$child(projectId).$add(idea);
            },
            //Delete idea
            delete: function(projectId, ideaId) {
                return ideas.$child(projectId).$remove(ideaId);
            },
            //Find idea
            find: function(projectId, ideaId) {
                return ideas.$child(projectId).$child(ideaId);
            },
            //Update idea
            update: function(projectId, ideaId, idea) {
                return ideas.$child(projectId).$child(ideaId).$set(idea);
            },
            //Comments

            //Get single comment
            getComment: function(projectId, ideaId, commentId) {
                return ideas.$child(projectId).$child(ideaId).$child('comments').$child(commentId);
            },
            //Get all comments
            getComments: function(projectId, ideaId) {
                return ideas.$child(projectId).$child(ideaId).$child('comments');
            },
            //Add comment
            addComment: function(projectId, ideaId, comment) {
                return ideas.$child(projectId).$child(ideaId).$child('comments').$add(comment);
            },
            //Remove comment
            removeComment: function(projectId, ideaId, commentId) {
                return ideas.$child(projectId).$child(ideaId).$child('comments').$remove(commentId);
            },
            //Voting for ideas

            //Positive vote for idea
            voteUp: function(projectId, ideaId, userId) {
                //idea = single idea by projectId and ideaId
                var idea = ideas.$child(projectId).$child(ideaId),
                    //manages voting based on amount
                    vote = function(amount) {
                        //put user in up votes
                        idea.$child('up').$child(userId).$set(userId).then(function() {
                            //mark positive vote in user (also removes negative votes)
                            User.voteUp(userId, ideaId);
                            //remove negative vote on idea
                            idea.$child('down').$remove(userId);

                            //update score of idea, transaction to make sure value ends up being correct
                            ideas.$child(projectId).$child(ideaId).$child('score').$transaction(function(score) {
                                //if score doesn't exist..
                                if (score === undefined) {
                                    //set it to 1
                                    return +1;
                                } else {
                                    //otherwise increase by amount (1 or 2)
                                    return score + amount;
                                }
                            });
                        });
                    };
                //Make sure user hasn't already given a positive vote
                if (!idea.$child('up').hasOwnProperty(userId)) {
                    //Check if user has already given a negative vote
                    if (idea.$child('down').hasOwnProperty(userId)) {
                        //.. if it has score should increase by 2
                        vote(2);
                    } else {
                        //..otherwise it should increase by 1
                        vote(1);
                    }
                }
            },
            //Negative vote for idea
            voteDown: function(projectId, ideaId, userId) {
                //idea = single idea by ideaId
                var idea = ideas.$child(projectId).$child(ideaId),
                    //manage voting based on amount
                    vote = function(amount) {
                        //put user in up votes
                        idea.$child('down').$child(userId).$set(userId).then(function() {
                            //mark negative vote on user
                            User.voteDown(userId, ideaId);
                            //remove positive vote from user on idea
                            idea.$child('up').$remove(userId);
                            //update score of idea, transaction because new value is based on old value
                            ideas.$child(projectId).$child(ideaId).$child('score').$transaction(function(score) {
                                //If score doesn't exist
                                if (score === undefined) {
                                    //set it to -1
                                    return -1;
                                } else {
                                    //otherwise decrease by amount
                                    return score - amount;
                                }
                            });
                        });
                    };
                //make sure user hasn't already given a negative vote
                if (!idea.$child('down').hasOwnProperty(userId)) {
                    //if user has already given a positive vote
                    if (idea.$child('up').hasOwnProperty(userId)) {
                        //it should decrease by 2
                        vote(2);
                    } else {
                        //otherwise it should decrease by 1
                        vote(1);
                    }
                }
            }
        };

    return Idea;
});