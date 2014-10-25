angular.module('site', ['ngRoute'])

/**
 * config
 */
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'mainController'
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
 * controllers
 */
    .controller('mainController', ['$scope', '$http', function ($scope, $http) {

    }])
    .controller('aboutController', ['$scope', '$http', function ($scope, aboutFactory) {
        // get stories from the factory
        $scope.stories = aboutFactory.getStories();
    }])
    .controller('projectsController', ['$scope', 'http', function ($scope, projectFactory) {
        // get projects from the factory
        $scope.projects = projectFactory.getProjects();
    }])

/**
 * factories
 */
    .factory('aboutFactory', ['$scope', '$http', function ($scope, $http) {
        return {
            getStories: function () {
                $http
                    .get('json/aboutStory.json')
                    .success(function (data, status, header, config) {
                        if (data && status === 200) {
                            return data;
                        }
                    })
            }
        }
    }])
    .factory('projectFactory', ['$scope', '$http', function ($scope, $http) {
        return {
            getProjects: function () {
                $http
                    .get('json/projects.json')
                    .success(function (data, status, header, config) {
                        if (data && status === 200) {
                            return data;
                        }
                    })
            }
        }
    }
]);