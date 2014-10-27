angular.module('site', ['ngRoute','ngAnimate', 'ui.bootstrap'])
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
        $scope.slides = [
            {image:'img/homePhoto1.jpg'},
            {image:'img/homePhoto2.jpg'},
            {image:'img/homePhoto3.jpg'},
            {image:'img/homePhoto4.jpg'},
            {image:'img/homePhoto5.jpg'},
            {image:'img/homePhoto6.jpg'}
        ];

        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index){
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };

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