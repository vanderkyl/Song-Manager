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
    id: -1
  };
  return button;
}

function loadFolder(folderId, prevFiles, loadFiles, getFiles, wait) {
  if (folderId != -1) {
    document.getElementById('loading').style.display = "block";
    previousFiles = FILE_LIST;
    prevFiles = previousFiles;
    listFiles(folderId);
    console.log("Files are loading. Please wait...");
    wait(loadFiles);
  } else {
    FILE_LIST = previousFiles;
    getFiles();
  }
}
