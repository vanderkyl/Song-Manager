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
  $('#file').scrollView();
  fileDiv.style.display = "block";
  video.style.display = "block";
}

function loadAudio(file) {
  var audio = document.getElementById("audio");
  var fileDiv = document.getElementById("file");
  $('#file').scrollView();
  fileDiv.style.display = "block";
  audio.style.display = "block";
  audio.load();
  audio.play();
}

function closeFile(id) {
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
      //console.log("Adding Folder [" + file.title + "]");
      addFolder(file);
    } else {
      //console.log("Adding File [" + file.title + "]");
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
  document.getElementById('loading').style.display = "none";
}

function getLikes(fileId) {
  console.log(fileId);
  var likesId = "likes-" + fileId;
  var fileLikes = localStorage.getItem(likesId);
  console.log(fileLikes);
  if (fileLikes === null) {
    localStorage.setItem(likesId, 0);
    var likes = parseInt(localStorage.getItem(likesId));
    console.log(likes);
    console.log(Number.isInteger(likes));
    return likes;
  } else {
    return fileLikes;
  }
}

function getFile(newFile, $sce) {
  var fileId = newFile.id;
  var fileObject = {
    name: newFile.title,
    id: fileId,
    path: $sce.trustAsResourceUrl(newFile.webContentLink),
    previewPath: $sce.trustAsResourceUrl("https://drive.google.com/file/d/" + fileId + "/preview"),
    type: newFile.fileExtension,
    pubdate: newFile.createdDate,
    likes: getLikes(newFile.id),
    comment: "Nothing",
    index: files.length,
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
