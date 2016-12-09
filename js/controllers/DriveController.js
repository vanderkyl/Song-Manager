app.controller('DriveController', ['$scope', '$sce',
function($scope, $sce) {
  $scope.bandName = "Vanderfry"
  $scope.videos = [
  {
    name: 'Drive Video',
    pubdate: new Date('2016', '11', '10'),
    video: 'https://drive.google.com/file/d/0BysYdC4iJkFUeEgzcEZNRWxtb28/preview',
    likes: 0,
    dislikes: 0,
    comment: "This is a video from google drive"
  }
  ];
  $scope.plusOne = function(index) {
    $scope.videos[index].likes += 1;
  };
  $scope.minusOne = function(index) {
    $scope.videos[index].dislikes += 1;
  };
  $scope.getVideoURL = function(index) {
    var video = document.getElementById('video');
    video.src = $scope.videos[index].video;
  };
  $scope.folders = [];
  $scope.addFolder = function(folder) {
    var folderObject = {
      name: folder.title,
      id: folder.id
    };
    $scope.folders.push(folderObject);
  };
  $scope.files = [];
  $scope.addFile = function(file) {
    var fileObject = {
      name: file.title,
      id: file.id,
      path: $sce.trustAsResourceUrl(file.webContentLink),
      pubdate: file.createdDate,
      likes: 0,
      dislikes: 0,
      comment: "Nothing"
    }
    $scope.files.push(fileObject);
  };
  $scope.openFolder = function(index) {

  };
  $scope.plusOne = function(index) {
    $scope.files[index].likes += 1;
  };
  $scope.minusOne = function(index) {
    $scope.files[index].dislikes += 1;
  };
  // Check if the "file" is a true file or a folder
  $scope.checkFile = function(file) {
    console.log("Checking...");
    if (file.mimeType == "application/vnd.google-apps.folder") {
      console.log("Adding Folder - Number of folders: " + $scope.folders.length);
      $scope.addFolder(file);
    } else {
      console.log("Adding File - Number of files: " + $scope.files.length);
      $scope.addFile(file);
    }
    document.getElementById("loadSongs").style.display = "none";
  };
  // Go through the files that were saved from the Google Api Call
  $scope.getAudio = function() {
    for (var i = 0; i < FILE_LIST.length; i++) {
      $scope.checkFile(FILE_LIST[i]);
    }
  };
}]);
