//TODO Change more than just the body background

function useDarkTheme() {
    console.log("Using Dark Theme");
    var html = document.getElementsByTagName("HTML")[0];
    var body = document.getElementsByTagName("BODY")[0];
    html.style.background="#28363d";
    body.style.background="#28363d";
    document.getElementById("navTool1").style.display = "none";
    document.getElementById("navTool2").style.display = "block";
}

function useLightTheme() {
    console.log("Using Light Theme");
    var html = document.getElementsByTagName("HTML")[0];
    var body = document.getElementsByTagName("BODY")[0];
    body.style.background="#F5F5F5";
    html.style.background="#F5F5F5";
    document.getElementById("navTool2").style.display = "none";
    document.getElementById("navTool1").style.display = "block";
}