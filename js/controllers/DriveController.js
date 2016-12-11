app.controller('DriveController', ['$scope', '$sce',
function($scope, $sce) {
  $scope.bandName = "Vanderfry"
  // Folders
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
  $scope.loadFiles = function() {
    console.log("Cleared previous folders and files.");
    $scope.addPreviousButton();
    $scope.getFiles();
    filesReady = false;
  };
  $scope.waitUntilFilesAreLoaded = function() {
    console.log("Checking if files are ready...");
    if (filesReady) {
      console.log("Loading files...")
      $scope.loadFiles();
    } else {
      setTimeout($scope.waitUntilFilesAreLoaded, 2000);
    }
  };
  $scope.addPreviousButton = function() {
    $scope.safeApply(function() {
      $scope.folders.push({
        name: "Back To Previous Folder",
        id: -1
      });
    });
  };
  $scope.openFolder = function(index) {
    var folderId = $scope.folders[index].id;
    $scope.emptyFilesAndFolders();
    if (folderId != -1) {
      $scope.previousFiles = FILE_LIST;
      listFiles(folderId);
      console.log("Files are loading. Please wait...");
      $scope.waitUntilFilesAreLoaded();
    } else {
      FILE_LIST = $scope.previousFiles;
      $scope.getFiles();
    }
  };
  $scope.emptyFilesAndFolders = function() {
    $scope.folders.length = 0;
    $scope.files.length = 0;
    $scope.folders = [];
    $scope.files = [];
    document.getElementById("file").style.display = "none";
  };
  // Files
  $scope.previousFiles = [];
  $scope.files = [];
  $scope.recentFiles = [];
  $scope.file = {};
  $scope.openFile = function(index) {
    var file = $scope.files[index];
    $scope.safeApply(function(index) {
      console.log(file);
      $scope.file = file;
      FILE_ID = file.id;
      FILE_NAME = file.title
      console.log($scope.file);
    });
    $scope.recentFiles.push(file);
    document.getElementById("audio").load();
    document.getElementById("file").style.display = "block";
    DISQUS.reset({
      reload: true,
      config: function () {
        var id = $scope.file.id;
        console.log(id);
        this.page.identifier = id;
        this.page.url = "http://kylevanderhoof.com/" + id;
        this.page.title = "File";
      }
    });
    //window.location = "/#/drive-audio#" + FILE_ID;
  };
  $scope.addFile = function(file) {
    var fileObject = {
      name: file.title,
      id: file.id,
      path: $sce.trustAsResourceUrl(file.webContentLink),
      pubdate: file.createdDate,
      likes: 0,
      dislikes: 0,
      comment: "Nothing",
      index: $scope.files.length
    };
    $scope.safeApply(function() {
      $scope.files.push(fileObject);
    });

  };
  $scope.plusOneOnFile = function() {
    $scope.file.likes += 1;
    //$scope.files[$scope.file.index].likes += 1;
  };
  $scope.plusOne = function(index) {
    $scope.files[index].likes += 1;
  };
  $scope.minusOneOnFile = function() {
    $scope.file.dislikes += 1;
    //$scope.files[$scope.file.index].dislikes += 1;
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
    if ($scope.previousFiles.length == 0) {
      document.getElementById("loadSongs").style.display = "none";
    }
  };
  // Go through the files that were saved from the Google Api Call
  $scope.getFiles = function() {
    for (var i = 0; i < FILE_LIST.length; i++) {
      $scope.checkFile(FILE_LIST[i]);
    }
  };
  // Safely wait until the digest is funished before applying the ui change
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
