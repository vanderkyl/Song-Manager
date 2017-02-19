app.controller('MainController', ['$scope',
function($scope) {
  $scope.title = 'Idea Manager';
  $scope.message = '';
  $scope.navigateToSongIdeas = function() {
    navigateToURL("/#/drive-audio");
  };
  $scope.navigateToComments = function() {
    navigateToURL("/#/comment");
  };
}]);
