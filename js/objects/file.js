var CURRENT_FILE = {};

function getFile(newFile, $sce) {
    var fileId = newFile.id;
    var fileObject = {
        name: newFile.title,
        id: fileId,
        path: $sce.trustAsResourceUrl(newFile.webContentLink),
        previewPath: $sce.trustAsResourceUrl("https://drive.google.com/file/d/" + fileId + "/preview"),
        type: newFile.fileExtension,
        size: calculateFileSize(newFile.fileSize),
        bytes: newFile.fileSize,
        likes: getLikes(fileId),
        timestamps: []
    };
    return fileObject;
}

function loadFilePage($sce) {
  var file = CURRENT_FILE;
  if (file.type === null) {
    if (file.type === "m4a") {
        hideElementById("videoId");
    } else {
        hideElementById("audioId");
    }
  } else {
    //TODO finish filling out the file properties
    console.log("Getting file from Google Drive");
    var fileId = getParameterByName("id");
      file = {
          name: fileId,
          id: fileId,
          path: $sce.trustAsResourceUrl("https://drive.google.com/file/d/" + fileId + "/preview"),
          previewPath: $sce.trustAsResourceUrl("https://drive.google.com/file/d/" + fileId + "/preview"),
          type: "m4a",
          size: "",
          bytes: "",
          likes: getLikes(fileId),
          timestamps: []
      };
  }
  console.log(file);
  displayElementById("file");
  hideElementById("authorize-div")
  loadDisqus(file);
  return file;
}

function loadFile(file) {
    switch(file.type) {
        case "m4a":
            loadAudio(file);
            break;
        case "MP4":
            loadVideo(file);
            break;
        default:
    }
    loadDisqus(file);
}

function loadVideo(file) {
  scrollToElementById("files");
  displayElementById("video");
  displayElementById("file");
}

function loadAudio(file) {
  hideElementById("audioPlayer");
  scrollToElementById("files");
  displayElementById("file");
  displayElementById("audio");
  var audio = getElementById("audio");
  audio.load();
  audio.play();
}

function closeFile(id) {
  checkIfAudioIsPlaying();
  hidePreviousFile();
  //scrollToElementById(id);
}

function hidePreviousFile() {
  console.log("Hiding previous file.");
  hideElementById("file");
  hideElementById("audio");
  hideElementById("video");
}

// Check if the "file" is a true file or a folder
function checkFile(file, addFolder, addFile) {
  if (isTrashed(file)) {
    if (isFolder(file)) {
      addFolder(file);
    } else {
      addFile(file);
    }
  }
  if (PREVIOUS_FOLDER.length === 0) {
    hideElementById("loadSongs");
  }
};

function sortFiles(addFolder, addFile) {
  for (var i = 0; i < FILE_LIST.length; i++) {
    checkFile(FILE_LIST[i], addFolder, addFile);
  }
  hideElementById("loading");
}

function getLikes(fileId) {
  var likesId = "likes-" + fileId;
  //var fileLikes = localStorage.getItem(likesId);
  var fileLikes = getItemFromLocalStorage(likesId);
  if (fileLikes === null) {
    saveItemToLocalStorage(likesId, 0);
    //localStorage.setItem(likesId, 0);
    var likes = parseInt(getItemFromLocalStorage(likesId));
    return likes;
  } else {
    return fileLikes;
  }
}

function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

function calculateFileSize(bytes) {
  var kiloByte = 1024;
  var megaByte = 1048576;
  var gigaByte = 1073741824;
  var fileSize = bytes;
  if (bytes < kiloByte) {
    fileSize += " bytes";
  } else if (bytes < megaByte) {
    fileSize = roundToTwoDecimals(bytes/kiloByte) + " KB";
  } else if (bytes < gigaByte) {
    fileSize = roundToTwoDecimals(bytes/megaByte) + " MB";
  } else {
    fileSize = roundToTwoDecimals(bytes/gigaByte) + " GB";
  }
  return fileSize;
}

function saveLike(file) {
  var likesId = "likes-" + file.id;
  var likes = parseInt(getItemFromLocalStorage(likesId));
  likes += 1;
  saveItemToLocalStorage(likesId, likes);
  file.likes = likes;
}

function isTrashed(file) {
  return file.explicitlyTrashed === false;
}

function isFolder(file) {
  return file.mimeType == "application/vnd.google-apps.folder";
}
