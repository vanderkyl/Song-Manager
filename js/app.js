var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainController',
    templateUrl: 'views/home.html'
  })
  .when('/home', {
    controller: 'MainController',
    templateUrl: 'views/home.html'
  })
  .when('/drive-audio', {
    controller: 'DriveController',
    templateUrl: 'views/driveAudio.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
