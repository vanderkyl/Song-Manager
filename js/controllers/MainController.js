app.controller('MainController', ['$scope',
function($scope) {
  $scope.title = 'Idea Manager';
  $scope.message = '';
  $scope.navigateToSongIdeas = function() {
    window.location = "/#/drive-audio";
  };
  $scope.navigateToComments = function() {
    window.location = "/#/comment";
  };

}]);
