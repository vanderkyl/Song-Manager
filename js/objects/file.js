var previousFiles = [];

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

function loadFilePage(file) {
  switch(file.type) {
    case "m4a":
      document.getElementById("videoId").style.display = "none";
      break;
    case "MP4":
      document.getElementById("audioId").style.display = "none";
      break;
    default:
  }
  loadDisqus(file);
}

function loadVideo(file) {
  var video = document.getElementById("video");
  var fileDiv = document.getElementById("file");
  $('#files').scrollView();
  fileDiv.style.display = "block";
  video.style.display = "block";
}

function loadAudio(file) {
  var audio = document.getElementById("audio");
  var audioPlayer = document.getElementById("audioPlayer");
  var fileDiv = document.getElementById("file");
  audioPlayer.style.display = "none";
  $('#files').scrollView();
  fileDiv.style.display = "block";
  audio.style.display = "block";
  audio.load();
  audio.play();
}

function playAudio() {
  var audio = document.getElementById("audio");
  audio.play();
}

function pauseAudio() {
    var audio = document.getElementById("audio");
    audio.pause();
}

function checkTime() {
    var audio = document.getElementById("audio");
    alert(audio.currentTime);
}

function closeFile(id) {
  checkIfAudioIsPlaying();
  hidePreviousFile();
  var fileId = "#" + id;
  $(fileId).scrollView();
}

function hidePreviousFile() {
  console.log("Hiding previous file.");
  document.getElementById("file").style.display = "none";
  document.getElementById("audio").style.display = "none";
  document.getElementById("video").style.display = "none";
}

// Check if the "file" is a true file or a folder
function checkFile(file, addFolder, addFile) {
  //console.log("Checking...");
  if (file.explicitlyTrashed == false) {
    if (file.mimeType == "application/vnd.google-apps.folder") {
      addFolder(file);
    } else {
      addFile(file);
    }
  }
  if (previousFiles.length == 0) {
    document.getElementById("loadSongs").style.display = "none";
  }
};

function sortFiles(addFolder, addFile) {
  for (var i = 0; i < FILE_LIST.length; i++) {
    checkFile(FILE_LIST[i], addFolder, addFile);
  }
  document.getElementById("loading").style.display = "none";
}

function getLikes(fileId) {
  var likesId = "likes-" + fileId;
  var fileLikes = localStorage.getItem(likesId);
  if (fileLikes === null) {
    localStorage.setItem(likesId, 0);
    var likes = parseInt(localStorage.getItem(likesId));
    return likes;
  } else {
    return fileLikes;
  }
}

function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

function calculateFileSize (bytes) {
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

function getFileSize (file) {
  return calculateFileSize(parseInt(file.fileSize));
}

function getFile(newFile, $sce) {
  var fileId = newFile.id;
  var fileObject = {
    name: newFile.title,
    id: fileId,
    path: $sce.trustAsResourceUrl(newFile.webContentLink),
    previewPath: $sce.trustAsResourceUrl("https://drive.google.com/file/d/" + fileId + "/preview"),
    type: newFile.fileExtension,
    size: getFileSize(newFile),
    likes: getLikes(newFile.id),
    timestamps: []
  };
  return fileObject;
}

function getDriveFile() {
  var request = gapi.client.drive.files.get({
    'fileId': fileId
  });
  request.execute(function(resp) {
    console.log('Title: ' + resp.title);
    console.log('Description: ' + resp.description);
    console.log('MIME type: ' + resp.mimeType);
  });
}

function saveLike(file) {
  var likesId = "likes-" + file.id;
  var likes = parseInt(localStorage.getItem(likesId));
  likes += 1;
  localStorage.setItem(likesId, likes);
  file.likes = likes;
}

// Get query paramater from url
// Credit to
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Guarantee that the button pressed is the only one that activates
// Use if there is a button on top of a button.
function stopPropogation() {
  event.cancelBubble = true;
    if(event.stopPropagation) event.stopPropagation();
}

$.fn.scrollView = function () {
  return this.each(function () {
      $('html, body').animate({
          scrollTop: $(this).offset().top
      }, 1000);
  });
}
