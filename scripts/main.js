// instantiate module
angular.module('site', ['ngRoute'])
    // config
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller:'mainController'
            })
            .when('/about', {
                templateUrl: 'partials/about.html',
                controller:'aboutController'
            })
            .when('projects', {
                templateUrl: 'partials/projects.html',
                controller:'projectsController'
            })
    })
    // controller
    .controller('mainController', function ($scope) {
        $scope.message = 'Hi';
    })
    .controller('aboutController', function($scope){
        $scope.message = 'Look! I am an about page.';
    })
    .controller('projectsController',function($scope){
        $scope.message = 'Look! I am an about page.';
    });