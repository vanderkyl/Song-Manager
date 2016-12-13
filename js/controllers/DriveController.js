app.controller('DriveController', ['$scope', '$sce',
function($scope, $sce) {
  $scope.bandName = "Vanderfry"
  // Folders
  $scope.folders = [];
  // Files
  $scope.files = [];
  $scope.file = {};
  //TODO Create functionality for a recent file selection
  $scope.recentFiles = [];
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
    var folderId = $scope.folders[index].id;
    $scope.clearFilesAndFolders();
    loadFolder(folderId,
      $scope.previousFiles,
      $scope.loadFiles,
      $scope.getFiles,
      $scope.waitUntilFilesAreLoaded);
  };
  $scope.openFile = function(index) {
    var file = $scope.files[index];
    $scope.safeApply(function(index) {
      $scope.file = file;
      $scope.recentFiles.push(file);
    });
    loadFile(file);
  };
  $scope.plusOneOnFile = function() {
    $scope.file.likes += 1;
  };
  $scope.plusOne = function(index) {
    $scope.files[index].likes += 1;
  };
  $scope.minusOneOnFile = function() {
    $scope.file.dislikes += 1;
  };
  $scope.minusOne = function(index) {
    $scope.files[index].dislikes += 1;
  };
  // Go through the files that were saved from the Google Api Call
  $scope.getFiles = function() {
    sortFiles($scope.addFolder, $scope.addFile, $scope.previousFiles);
  };
  // Add button to go back to previous folder contents
  $scope.addPreviousButton = function() {
    $scope.safeApply(function() {
      $scope.folders.push(getPreviousButton());
    });
  };
  $scope.loadFiles = function() {
    console.log("Loading files...")
    $scope.addPreviousButton();
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
