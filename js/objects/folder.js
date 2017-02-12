var PREVIOUS_FOLDER_BUTTON = "PREV_BUTTON";

function getFolder(folder) {
  var folderObject = {
    name: folder.title,
    id: folder.id
  };
  return folderObject;
}

function getPreviousButton() {
  var button = {
    name: "Back To Previous Folder",
    id: PREVIOUS_FOLDER_BUTTON
  };
  return button;
}

function requestingPreviousFolder(folderId) {
  return folderId === PREVIOUS_FOLDER_BUTTON;
}

function cacheFolder(folderId, recentFiles, files) {
  console.log("Folder saved: " + folderId);
  recentFiles[folderId] = files;
}

function folderIsCached(folderId, recentFiles) {
  console.log("Checking if folder is cached: " + folderId);
  var isFolderCached = folderId in recentFiles;
  console.log("Folder cached: " + isFolderCached);
  return isFolderCached;
}

function loadFolder(folderId, previousFiles, recentFiles, loadFiles, getFiles, wait) {
  if (requestingPreviousFolder(folderId)) {
    hidePreviousFile();
    FILE_LIST = previousFiles.pop();
    getFiles();
  } else if (folderIsCached(folderId, recentFiles)) {
    previousFiles.push(FILE_LIST);
    listCachedFiles(folderId, recentFiles);
    wait(loadFiles);
  } else {
    document.getElementById('loading').style.display = "block";
    previousFiles.push(FILE_LIST);
    listFiles(folderId, recentFiles);
    console.log("Files are loading. Please wait...");
    wait(loadFiles);
  }
}
