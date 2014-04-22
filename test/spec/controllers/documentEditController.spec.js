'use strict';

describe('Controller: DocumentEditController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var DocumentEditController, scope, q, d,
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
            },
            getProjectId: function() {
                d = q.defer();
                return d.promise;
            }
        },
        resolver = function() {
            d.resolve('userId');
            scope.$digest();
            d.resolve('projectId');
            scope.$digest();
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        DocumentEditController = $controller('DocumentEditController', {
            $scope: scope,
            User: User
        });
    }));

    it('should be defined', function() {
        expect(DocumentEditController).toBeDefined();
    });

    it('firepad should be a directive');
});