/**
 * Created by MuhammadRizky on 9/21/14.
 */

(function () {
    // module declaration
    angular.module("app", ["ngRoute"])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        template: 'partials/home.html'
                    })
                    .when('/about', {
                        template: 'partials/about.html'
                    })
                    .when('/projects', {
                        template: 'partials/projects.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }])
        .controller("mainController", function ($scope) {

        });
});