angular.module('site', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
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
            .when('/projectDetails', {
                templateUrl: 'partials/projectDetails.html',
                controller: 'projectDetailsController'
            })
    }])

/**
 * services
 */
    .service('projectDetailsService', ['$http', function ($http) {
        var currentProject = "";

        var setCurrentProjectFile = function (newProj) {
            currentProject = newProj;
        };

        var getCurrentProjectFile = function () {
            return currentProject;
        };

        return {
            setCurrentProjectFile: setCurrentProjectFile,
            getProjectFile: getCurrentProjectFile
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
    .factory('projectDetailsFactory', ['$http', 'projectDetailsService', function ($http, projectDetailsService) {
        return {
            getProjectDetails: function () {
                return $http.get('json/' + projectDetailsService.getProjectFile() + '.json').then(function (response) {
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

        carouselFactory.getCarousel().then(function (data) {
            angular.copy(data, $scope.slides);
        });

        $scope.setCurrentSlideIndex = function (index) {
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
    .controller('projectsController', ['$scope', 'projectFactory', 'projectDetailsService', function ($scope, projectFactory, projectDetailService) {
        $scope.projects = [];

        projectFactory.getProjects().then(function (data) {
            angular.copy(data, $scope.projects);
        });

        $scope.setCurrentProject = projectDetailService.setCurrentProjectFile;
    }])
    .controller('projectDetailsController', ['$scope', 'projectDetailsFactory', 'projectDetailsService', '$location', function ($scope, projectDetailsFactory, projectDetailsService, $location) {
        $scope.project = {};

        projectDetailsFactory.getProjectDetails().then(function (data) {
            angular.copy(data, $scope.project);
        });
    }]);