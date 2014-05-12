'use strict';

describe('Controller: DocumentController', function() {
    beforeEach(function() {
        module('projiApp');
    });

    var DocumentController, scope, q, d,
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
        Document = {
            all: jasmine.createSpy('all'),
            create: jasmine.createSpy('create'),
            delete: jasmine.createSpy('delete')
        };


    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        $rootScope.currentUser = {
            pid: 'projectId',
            uid: 'userId',
            md5Hash: 'hash',
            username: 'username'
        };
        DocumentController = $controller('DocumentController', {
            $scope: scope,
            User: User,
            Document: Document
        });

    }));

    it('should be defined', function() {
        expect(DocumentController).toBeDefined();
    });

    describe('$scope.documents', function() {
        beforeEach(function() {});

        it('should call Document.all', function() {
            expect(Document.all).toHaveBeenCalled();
        });

        it('..with userId', function() {
            expect(Document.all).toHaveBeenCalledWith('projectId');
        });
    });

    describe('$scope.document', function() {
        beforeEach(function() {});

        it('should be defined', function() {
            expect(scope.document).toBeDefined();
        });

        it('..and be {}', function() {
            expect(scope.document).toEqual({});
        });
    });

    describe('$scope.createDocument', function() {
        beforeEach(function() {
            scope.createDocument();
        });

        it('should call Document.create', function() {
            expect(Document.create).toHaveBeenCalled();
        });

        it('..with projectId, $scope.document', function() {
            expect(Document.create).toHaveBeenCalledWith('projectId', scope.document);
        });
    });

    describe('$scope.deleteDocument', function() {
        beforeEach(function() {
            scope.deleteDocument('documentId');
        });

        it('should call Document.delete', function() {
            expect(Document.delete).toHaveBeenCalled();
        });

        it('..with projectId, documentId', function() {
            expect(Document.delete).toHaveBeenCalledWith('projectId', 'documentId');
        });
    });
});