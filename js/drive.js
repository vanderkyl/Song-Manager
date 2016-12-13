// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '528197877151-u6dq0rnndrkjcsflhfc7550dnleu9vju.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDK4xg7QanG2KfFp_T4HiuLxl7LGiBvrxI';
var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
var FILE_LIST = [];
var FOLDER_ID = "0BysYdC4iJkFUfnNGcHZuclNsc01xMUhfX3AzdGxnX2FEZi12MkZIRDF2emNkaERsWGNWRjQ";
var URL = "http://video.vanderhoof.com:8080/#/drive-audio";
var filesReady = false;

//TODO Remove this when finished creating folder and file structure
var TEST_FILE = [
  {
    title: "Test Folder",
    mimeType: "application/vnd.google-apps.folder",
    id: "TEST"
  },
  {
    title: "Test File",
    mimeType: "file",
    id: "1234",
    createdDate: "2016-12-02T22:31:21.487Z",
    webContentLink: "https://drive.google.com/uc?id=0BysYdC4iJkFUU1NrajVZR0YzVWs&export=download"
  }
];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.client.setApiKey(API_KEY);
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  var loadingAnimation = document.getElementById('loading');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadingAnimation.style.display = "block";
    loadDriveApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

// Store and display files and folders
function displayFiles(response) {
  console.log(response);
  if (FILE_LIST.length == 0) {
    FILE_LIST = response;
    document.getElementById('loading').style.display = "none";
    document.getElementById("loadSongs").style.display = "block";
  } else {
    FILE_LIST = response;
    filesReady = true;
  }
  console.log("Done!!!");
}


/**
 * Retrieve a list of File resources.
 *
 * @param {Function} callback Function to call when the request is complete.
 */
function listFiles(folderId) {
  //TODO Take the test portion out when finished.
  if (folderId == "TEST") {
    displayFiles(TEST_FILE);
  } else {
    var retrievePageOfFiles = function(request, result) {
      request.execute(function(resp) {
        result = result.concat(resp.items);
        var nextPageToken = resp.nextPageToken;
        if (nextPageToken) {
          request = gapi.client.drive.files.list({
            'pageToken': nextPageToken
          })
          retrievePageOfFiles(request, result);
        } else {
          displayFiles(result);
        }
      });
    }
    var initialRequest = gapi.client.drive.files.list({
      q: "'" + folderId + "' in parents"
    });
    return retrievePageOfFiles(initialRequest, []);
  }
}

function loadFiles() {
  listFiles(FOLDER_ID);
}

function loadTestFiles() {
  document.getElementById('authorize-div').style.display = "none";
  displayFiles(TEST_FILE);
}
/**
 * Load Drive API client library.
 */
function loadDriveApi() {
  console.log("Loading files from Google Drive...");
  gapi.client.load('drive', 'v2', loadFiles);
}

function printOutput(response) {
  //document.getElementById("output").innerText = response.kind;
  var stringConstructor = "test".constructor;
  var arrayConstructor = [].constructor;
  var objectConstructor = {}.constructor;

  function whatIsIt(object) {
      if (object === null) {
          return "null";
      }
      else if (object === undefined) {
          return "undefined";
      }
      else if (object.constructor === stringConstructor) {
          return "String";
      }
      else if (object.constructor === arrayConstructor) {
          return "Array";
      }
      else if (object.constructor === objectConstructor) {
          var items = object.result.items;
          console.log(object);
          for (var i = 0; i < items.length; i++) {
            console.log(items[i].selfLink);
          }

          //angular.element($('output')).scope().createAudioObjects().apply();
          var res = gapi.client.request('https://www.googleapis.com/drive/v2/files/0BysYdC4iJkFUU1NrajVZR0YzVWs');
          res.then(function(result) {
            console.log(result);
          }, function(reason) {
            console.log(reason);
          });
          //listFiles();
          return "Object";
      }
      else {
          return "don't know";
      }
  }
  console.log(whatIsIt(response));
}
