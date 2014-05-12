'use strict';

describe('Controller: OverviewController', function() {

    // load the controller's module
    beforeEach(function() {
        module('projiApp');
        // module('projiMocks');
        // module('projiApp', function($provide) {
        //     $provide.value('Project', mockProject);
        // });
    });
    //I should probably make mocks for all the services seeing as they'll all be used in more than one controller
    //Let's finnish off this one first though

    //Wrap it?
    // beforeEach(function() {
    //     //declarations
    // });

    var OverviewController, scope, q, d,
        projectData = {
            name: 'name',
            description: 'description'
        },
        ideaData = {
            name: 'name',
            description: 'description'
        },
        ideasData = {
            1: ideaData,
            2: ideaData,
            3: ideaData
        },
        taskData = {
            name: 'name',
            description: 'description'
        },
        tasksData = {
            1: taskData,
            2: taskData,
            3: taskData
        },
        sprintData = {
            id: '1',
            name: 'name',
            description: 'description'
        },
        userData = {
            userId: 'id',
            projectId: 'id'
        },
        Project = {
            find: jasmine.createSpy('find').and.returnValue(projectData)
        },
        Idea = {
            all: function() {
                return ideasData;
            },
            voteUp: function() {},
            voteDown: function() {}
        },
        Task = {
            all: function() {
                return tasksData;
            }
        },
        Sprint = {
            getCurrent: function() {
                d = q.defer();
                return d.promise;
            },
            find: function() {
                return sprintData;
            }
        },
        User = {
            getUserId: function() {
                d = q.defer();
                return d.promise;
                // return 'id';
            },
            getProjectId: function() {
                d = q.defer();
                return d.promise;
                // return 'id';
            }
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        $rootScope.currentUser = {
            pid: 'projectId',
            uid: 'userId',
            md5Hash: 'hash',
            username: 'username'
        };
        OverviewController = $controller('OverviewController', {
            $scope: scope,
            Project: Project,
            Idea: Idea,
            Task: Task,
            Sprint: Sprint,
            User: User
        });
    }));

    it('should exist', function() {
        expect(OverviewController).toBeDefined();
    });

    it('should request Project.find to populate scope.project', function() {
        // spyOn(Project, 'find');
        expect(Project.find).toHaveBeenCalled();
    });

    it('should populate $scope.project with a project', function() {
        expect(scope.project).toEqual(projectData);
    });

    it('should populate $scope.ideas with ideas', function() {
        expect(scope.ideas).toBe(ideasData);
    });

    it('should populate $scope.tasks with tasks', function() {
        expect(scope.tasks).toBe(tasksData);
    });

    it('should populate $scope.sprint with the current sprint', function() {
        d.resolve(sprintData.id);
        scope.$digest();
        expect(scope.sprint).toBe(sprintData);
    });

    it('should call Idea.voteUp on voteUp', function() {
        spyOn(Idea, 'voteUp');
        scope.voteUp();
        scope.$digest();
        expect(Idea.voteUp).toHaveBeenCalled();
    });

    it('should call Idea.voteDown on voteDown', function() {
        spyOn(Idea, 'voteDown');
        scope.voteDown();
        scope.$digest();
        expect(Idea.voteDown).toHaveBeenCalled();
    });

});