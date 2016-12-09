// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '528197877151-u6dq0rnndrkjcsflhfc7550dnleu9vju.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDK4xg7QanG2KfFp_T4HiuLxl7LGiBvrxI';
var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
var FILE_LIST = {};
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
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
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
  FILE_LIST = response;
  console.log("Done!!!");
  document.getElementById("loadSongs").style.display = "block";
}


/**
 * Retrieve a list of File resources.
 *
 * @param {Function} callback Function to call when the request is complete.
 */
function listFiles(callback) {
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
    q: "'0BysYdC4iJkFUfnNGcHZuclNsc01xMUhfX3AzdGxnX2FEZi12MkZIRDF2emNkaERsWGNWRjQ' in parents"
  });
  retrievePageOfFiles(initialRequest, []);
}

/**
 * Load Drive API client library.
 */
function loadDriveApi() {
  console.log("Loading files from Google Drive...");
  gapi.client.load('drive', 'v2', listFiles);
  /*
  var json = gapi.client.request("https://www.googleapis.com/drive/v2/files/0BysYdC4iJkFUfnNGcHZuclNsc01xMUhfX3AzdGxnX2FEZi12MkZIRDF2emNkaERsWGNWRjQ/children");
  json.then(function(response) {
    displayFiles(response);
  }, function(reason) {
    console.log(reason);
  });*/


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
