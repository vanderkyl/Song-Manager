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
    id: "PREV_BUTTON"
  };
  return button;
}

function loadFolder(folderId, previousFiles, loadFiles, getFiles, wait) {
  if (folderId != "PREV_BUTTON") {
    document.getElementById('loading').style.display = "block";
    previousFiles.push(FILE_LIST);
    listFiles(folderId);
    console.log("Files are loading. Please wait...");
    wait(loadFiles);
  } else {
    FILE_LIST = previousFiles.pop();
    getFiles();
  }
}
