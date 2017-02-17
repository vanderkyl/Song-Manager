function checkIfAudioIsPlaying() {
    var audio = document.getElementById("audio");
    if (!audio.paused || (audio.currentTime != 0)) {
        document.getElementById("audioPlayer").style.display = "block";
    }
}