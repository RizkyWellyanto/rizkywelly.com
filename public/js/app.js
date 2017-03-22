/**
 * Created by rizky on 3/14/17.
 */

var app = angular.module('app', ['ngRoute', 'AppControllers', 'AppServices']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'partials/home.html',
            controller:'HomeController'
        });
}]);