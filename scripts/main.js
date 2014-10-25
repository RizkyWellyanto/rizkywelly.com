angular.module('site', ['ngRoute'])
/**
 * config
 */
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'homeController'
            })
            .when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'aboutController'
            })
            .when('/projects', {
                templateUrl: 'partials/projects.html',
                controller: 'projectsController'
            })
    }])

/**
 * factories
 */
    .factory('storyFactory', ['$http', function ($http) {
        return {
            getStories: function () {
                return $http.get('json/stories.json').then(function (response) {
                    if (response.data.error) {
                        return null;
                    }

                    return response.data;
                })
            }
        };
    }])
    .factory('projectFactory', ['$http', function ($http) {
        return {
            getProjects: function () {
                return $http.get('json/projects.json').then(function (response) {
                    if (response.data.error) {
                        return null;
                    }

                    return response.data;
                })
            }
        };
    }])

/**
 * controllers
 */
    .controller('homeController', ['$scope', '$http', function ($scope, $http) {

    }])
    .controller('aboutController', ['$scope', 'storyFactory', function ($scope, storyFactory) {
        $scope.stories = [];

        storyFactory.getStories().then(function (data) {
            angular.copy(data, $scope.stories);
        });
    }])
    .controller('projectsController', ['$scope', 'projectFactory', function ($scope, projectFactory) {
        $scope.projects = [];
        projectFactory.getProjects().then(function (data) {
            angular.copy(data, $scope.projects);
        });
    }]);