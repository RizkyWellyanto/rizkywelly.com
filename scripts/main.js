// instantiate module
angular.module('site', ['ngRoute'])

    // config
    .config(function ($routeProvider) {
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
    })

    // controllers
    .controller('mainController', function ($scope, $http) {

    })
    .controller('aboutController', function ($scope, $http) {
        $http
            .get('json/aboutStory.json')
            .success(function (data, status, header, config) {
                if (data && status === 200) {
                    $scope.photos = data.photos;
                    $scope.paragraphTitle = data.title;
                    $scope.paragraphText = data.text;
                }
            });
    })
    .controller('projectsController', function ($scope, $http) {
        $scope.projects = [];
    });