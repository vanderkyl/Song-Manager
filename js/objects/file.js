var previousFiles = [];

function loadDisqus(file) {
  DISQUS.reset({
    reload: true,
    config: function () {
      var id = file.id;
      console.log(id);
      this.page.identifier = id;
      this.page.url = "http://kylevanderhoof.com/" + id;
      this.page.title = file.name;
    }
  });
}

function loadFile(file) {
  document.getElementById("audio").load();
  var fileDiv = document.getElementById("file")
  fileDiv.style.display = "block";
  $('#file').scrollView()
  loadDisqus(file);
}

// Check if the "file" is a true file or a folder
function checkFile(file, addFolder, addFile) {
  console.log("Checking...");
  if (file.mimeType == "application/vnd.google-apps.folder") {
    console.log("Adding Folder [" + file.title + "]");
    addFolder(file);
  } else {
    console.log("Adding File [" + file.title + "]");
    addFile(file);
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

function getFile(newFile, $sce) {
  var fileObject = {
    name: newFile.title,
    id: newFile.id,
    path: $sce.trustAsResourceUrl(newFile.webContentLink),
    pubdate: newFile.createdDate,
    likes: 0,
    dislikes: 0,
    comment: "Nothing",
    index: files.length,
    timestamps: []
  };
  return fileObject;
}

$.fn.scrollView = function () {
  return this.each(function () {
      $('html, body').animate({
          scrollTop: $(this).offset().top
      }, 1000);
  });
}
