/**
 * Created by MuhammadRizky on 9/21/14.
 */

(function () {
    // module declaration
    var app = angular.module("app", ["ngRoute", "ngResource"]);

    // config the routes
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: './partials/home.html',
                    controller: 'mainController'
                }).
                when('/about', {
                    templateUrl: './partials/about.html',
                    controller: 'mainController'
                }).
                when('/projects', {
                    templateUrl: './partials/projects.html',
                    controller: 'mainController'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }]
    );

    // controller
    app.controller("mainController", function ($scope) {

    });
});