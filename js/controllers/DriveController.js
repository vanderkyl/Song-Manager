app.controller('DriveController', ['$scope', '$sce',
function($scope, $sce) {
  $scope.bandName = "Vanderfry"
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
  // Folders
  $scope.previousFolders = [];
  $scope.folders = [];
  $scope.addFolder = function(folder) {
    var folderObject = {
      name: folder.title,
      id: folder.id
    };
    $scope.safeApply(function() {
      $scope.folders.push(folderObject);
    });
  };
  $scope.reloadFiles = function() {
    console.log("Cleared previous folders and files.");
    $scope.getFiles();
    filesReady = false;
  }
  $scope.waitUntilFilesAreLoaded = function() {
    console.log("Checking if files are ready...");
    if (filesReady) {
      $scope.reloadFiles();
    } else {
      setTimeout($scope.waitUntilFilesAreLoaded, 2000);
    }
  }
  $scope.openFolder = function(index) {
    $scope.previousFolders = $scope.folders;
    listFiles($scope.folders[index].id);
    console.log("Files are loading. Please wait...");
    $scope.folders.length = 0;
    $scope.files.length = 0;
    $scope.folders = [];
    $scope.files = [];
    $scope.waitUntilFilesAreLoaded();
  };
  // Files
  $scope.previousFiles = [];
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
    };
    $scope.safeApply(function() {
      $scope.files.push(fileObject);
    });

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
      console.log("Adding Folder [" + file.title + "] - Number of folders: " + $scope.folders.length);
      $scope.addFolder(file);
    } else {
      console.log("Adding File [" + file.title + "] - Number of files: " + $scope.files.length);
      $scope.addFile(file);
    }
    if ($scope.previousFolders.length == 0) {
      document.getElementById("loadSongs").style.display = "none";
    }
  };
  // Go through the files that were saved from the Google Api Call
  $scope.getFiles = function() {
    for (var i = 0; i < FILE_LIST.length; i++) {
      $scope.checkFile(FILE_LIST[i]);
    }
  };
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
}]);
