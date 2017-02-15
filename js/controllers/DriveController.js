app.controller('DriveController', ['$scope', '$sce',
function($scope, $sce) {
  $scope.loadButton = "Enter";
  // Folders
  $scope.folders = [];
  $scope.folderName = "";
  // Files
  $scope.files = [];
  $scope.file = {};
  //TODO Create functionality for a recent file selection
  $scope.recentFiles = {};
  $scope.previousFiles = [];

  $scope.addFolder = function(folder) {
    $scope.safeApply(function() {
      $scope.folders.push(getFolder(folder));
    });
  };

  $scope.addFile = function(file) {
    $scope.safeApply(function() {
      $scope.files.push(getFile(file, $sce));
    });
  };

  $scope.openFolder = function(index) {
    var folder = $scope.folders[index];
    var folderId = folder.id;
    $scope.folderName = folder.name;
    $scope.clearFilesAndFolders();
    loadFolder(folderId,
      $scope.previousFiles,
      $scope.recentFiles,
      $scope.loadFiles,
      $scope.getFiles,
      $scope.waitUntilFilesAreLoaded);
  };

  $scope.openFile = function(index) {
    var file = $scope.files[index];
    $scope.safeApply(function(index) {
      $scope.file = file;
    });
    hidePreviousFile();
    loadFile(file);
  };

  $scope.closeFile = function() {
    closeFile($scope.file.id);
  };

  // Add like on file when opened
  $scope.plusOneOnFile = function() {
    saveLike($scope.file);
  };

  // Add like on file button
  $scope.plusOne = function(index) {
    stopPropogation();
    saveLike($scope.files[index]);
  };

  $scope.download = function(index) {
    stopPropogation();
    window.location = $scope.files[index].path;
  };

  $scope.downloadFile = function() {
    window.location = $scope.files[index].path;
  };

  // Go through the files that were saved from the Google Api Call
  $scope.getFiles = function() {
    if ($scope.previousFiles.length > 0) {
      $scope.addPreviousButton();
    }
    sortFiles($scope.addFolder, $scope.addFile, $scope.previousFiles);
  };

  // Add button to go back to previous folder contents
  $scope.addPreviousButton = function() {
    $scope.safeApply(function() {
      $scope.folders.push(getPreviousButton());
    });
  };

  $scope.loadFiles = function() {
    console.log("Loading files...");
    $scope.getFiles();
    filesReady = false;
  };

  $scope.waitUntilFilesAreLoaded = function() {
    if (filesReady) {
      $scope.loadFiles();
    } else {
      setTimeout($scope.waitUntilFilesAreLoaded, 2000);
    }
  };

  // Clear the arrays that hold the current files and folders
  $scope.clearFilesAndFolders = function() {
    $scope.folders.length = 0;
    $scope.files.length = 0;
    $scope.folders = [];
    $scope.files = [];
    console.log("Cleared previous folders and files.");
    document.getElementById("file").style.display = "none";
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
