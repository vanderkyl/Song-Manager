app.controller('MainController', ['$scope',
function($scope) {
  $scope.title = 'IDEAS';
  $scope.message = 'Leave a comment if you find a bug, issue, improvement idea, etc';
  $scope.navigateToSongIdeas = function() {
    window.location = "/#/drive-audio";
  };
  $scope.navigateToComments = function() {
      window.location = "/#/comment";
  };
}]);
