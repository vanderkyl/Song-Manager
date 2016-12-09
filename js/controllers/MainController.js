app.controller('MainController', ['$scope',
function($scope) {
  $scope.title = 'SONG MANAGER';
  $scope.promo = 'Welcome to the mind of Kyle Vanderhoof...';
  $scope.videos = [
  {
    name: 'Video 1',
    pubdate: new Date('2016', '10', '08'),
    video: 'videos/Chugga.MP4',
    likes: 0,
    dislikes: 0,
    comment: ["Hello", "World"]
  },
  {
    name: 'Video 2',
    pubdate: new Date('2016', '08', '01'),
    video: 'videos/Colorful.MP4',
    likes: 0,
    dislikes: 0,
    comment: ["One comment"]
  }
  ];
  $scope.plusOne = function(index) {
    $scope.videos[index].likes += 1;
  };
  $scope.minusOne = function(index) {
    $scope.videos[index].dislikes += 1;
  };
  $scope.addVideo = function() {
    var video = {
      name: 'Video3',
      rating: 10,
      pubdate: new Date('2016', '10', '08'),
      video: 'videos/Chugga.MP4',
      likes: 0,
      dislikes: 0
    }
    $scope.videos.push(video);
  };
}]);
