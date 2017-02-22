var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.factory('folders', function () {
    return folders;
});

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
    templateUrl: 'views/drive.html'
  })
  .when('/file', {
    controller: 'FileController',
    templateUrl: 'views/file.html'
  })
  .when('/comment', {
      controller: 'CommentController',
      templateUrl: 'views/comment.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
