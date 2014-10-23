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
            .when('/projects', {
                templateUrl: 'partials/projects.html',
                controller:'projectsController'
            })
    })

    // controllers
    .controller('mainController', function ($scope, $http) {

    })
    .controller('aboutController', function($scope){

    })
    .controller('projectsController',function($scope){

    });