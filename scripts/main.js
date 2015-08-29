var that = this;

require(["famous/core/Engine", "famous/core/Surface", "famous/views/RenderController", "famous/views/ScrollView", "famous/core/Modifier", "famous/core/Transform", "famous/surfaces/ImageSurface", "famous/modifiers/StateModifier", "famous/transitions/Easing", "famous/core/EventHandler", "famous/transitions/Transitionable"],
    function (FamousEngine, Surface, RenderController, ScrollView, Modifier, Transform, ImageSurface, StateModifier, Easing, EventHandler, Transitionable) {

        //var FamousEngine = require('famous/core/Engine');
        //var Surface = require('famous/core/Surface');

    that.mainContext = FamousEngine.createContext();
    that.scrollView = new ScrollView();

        that.createSurface = function (options) {
            var surface = new Surface(options);

            return surface;
        }
    });

this.Angular = angular.module('site', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
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
    .service('projectDetailsService', ['$http', '$route', function ($http, $route) {
        var currentProject = "";

        var setCurrentProjectFile = function (newProj) {
            currentProject = newProj;
            // somehow save project to the

            $route.reload();
        };

        var getCurrentProjectFile = function () {
            return currentProject;
        };

        return {
            setCurrentProjectFile: setCurrentProjectFile,
            getProjectFile: getCurrentProjectFile
        };
    }])
    .factory('storyFactory', ['$http', function ($http) {
        return {
            getStories: function () {
                return $http.get('json/view_content/stories.json').then(function (response) {
                    if (response.data.error) {
                        return null;
                    }

                    response.data.reverse();

                    return response.data;
                })
            }
        };
    }])
    .factory('projectFactory', ['$http', function ($http) {
        return {
            getProjects: function () {
                return $http.get('json/view_content/projects.json').then(function (response) {
                    if (response.data.error) {
                        return null;
                    }

                    function compare(item1,item2) {
                        if (item1.title < item2.title)
                            return -1;
                        if (item1.title > item2.title)
                            return 1;
                        return 0;
                    }
                    response.data.sort(compare);

                    return response.data;
                })
            }
        };
    }])
    .factory('carouselFactory', ['$http', function ($http) {
        return {
            getCarousel: function () {
                return $http.get('json/view_content/home.json').then(function (response) {
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
                return $http.get('json/projects/' + projectDetailsService.getProjectFile() + '.json').then(function (response) {
                    if (response.data.error) {
                        return null;
                    }

                    return response.data;
                })
            }
        };
    }])
    .controller('navBarController', ['$scope', 'projectFactory', 'projectDetailsService', function ($scope, projectFactory, projectDetailService) {
        $scope.projectsDropDownList = [];

        projectFactory.getProjects().then(function (data) {
            angular.copy(data, $scope.projectsDropDownList);
        });

        $scope.setCurrentProject = projectDetailService.setCurrentProjectFile;
    }])
    .controller('homeController', ['$scope', 'carouselFactory', '$interval', function ($scope, carouselFactory, $interval) {
        $scope.slides = [];
        $scope.currentIndex = 0;

        var autoSlide;
        var slideInterval = 5000;

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
            $scope.resetAutoSlide();
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            $scope.resetAutoSlide();
        };

        $scope.startAutoSlide = function () {
            autoSlide = $interval(function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            }, slideInterval);
        };

        $scope.resetAutoSlide = function () {
            $interval($scope.stopAutoSlide(), slideInterval, 1);
            $scope.startAutoSlide();
        };

        $scope.stopAutoSlide = function () {
            $interval.cancel(autoSlide);
        };

        $scope.$on('$destroy', function () {
            $scope.stopAutoSlide();
        });

        // run
        $scope.startAutoSlide();

    }])
    .controller('aboutController', ['$scope', 'storyFactory', function ($scope, storyFactory) {
        $scope.stories = [];

        storyFactory.getStories().then(function (data) {
            angular.copy(data, $scope.stories);
        });
    }])
    .controller('aboutStoryController', ['$scope', 'storyFactory', '$interval', function ($scope, storyFactory, $interval) {
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.currentIndex = ($scope.currentIndex < $scope.story.photos.length - 1) ? ++$scope.currentIndex : 0;
            //$scope.resetAutoSlide();
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.story.photos.length - 1;
            //$scope.resetAutoSlide();
        };
    }])
    .controller('projectsController', ['$scope', 'projectFactory', 'projectDetailsService', function ($scope, projectFactory, projectDetailService) {
        $scope.projects = [];

        projectFactory.getProjects().then(function (data) {
            angular.copy(data, $scope.projects);
        });

        $scope.setCurrentProject = projectDetailService.setCurrentProjectFile;
    }])
    .controller('projectsProjectController', ['$scope', 'storyFactory', '$interval', function ($scope, storyFactory, $interval) {
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.currentIndex = ($scope.currentIndex < $scope.project.photos.length - 1) ? ++$scope.currentIndex : 0;
            //$scope.resetAutoSlide();
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.project.photos.length - 1;
            //$scope.resetAutoSlide();
        };
    }]).controller('projectDetailsController', ['$scope', 'projectDetailsFactory', 'projectDetailsService', '$location', function ($scope, projectDetailsFactory, projectDetailsService, $location) {
        $scope.project = {};

        projectDetailsFactory.getProjectDetails().then(function (data) {
            angular.copy(data, $scope.project);
        });

        // load the currentDetailProject from localstorage
    }]);
