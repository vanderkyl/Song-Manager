//TODO Change more than just the body background

function useDarkTheme() {
    console.log("Using Dark Theme");
    var body = document.getElementsByTagName("BODY")[0];
    body.style.background="#353535";
    document.getElementById("navTool1").style.display = "none";
    document.getElementById("navTool2").style.display = "block";
}

function useLightTheme() {
    console.log("Using Light Theme");
    var body = document.getElementsByTagName("BODY")[0];
    body.style.background="#F5F5F5";
    document.getElementById("navTool2").style.display = "none";
    document.getElementById("navTool1").style.display = "block";
}