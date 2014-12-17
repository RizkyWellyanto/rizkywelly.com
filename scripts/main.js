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
 * services
 */
    .service('projectDetailService', ['$http', function ($http) {
        var projectList = [];

        var addProject = function(newObj) {
            projectList.push(newObj);
        };

        var getProject = function(){
            return projectList.pop();
        };

        return {
            addProduct: addProject,
            getProducts: getProject
        };
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
    .factory('carouselFactory', ['$http', function ($http) {
        return {
            getCarousel: function () {
                return $http.get('json/home.json').then(function (response) {
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
    .controller('homeController', ['$scope', 'carouselFactory', function ($scope, carouselFactory) {
        $scope.slides = [];
        $scope.currentIndex = 0;

        carouselFactory.getCarousel().then(function (data){
            angular.copy(data, $scope.slides);
        });

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