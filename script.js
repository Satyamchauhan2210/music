const audioPlayer = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const playlistElement = document.getElementById('playlist');

let songs = [
    { name: "Song 1", src: "Let Her Go-(SambalpuriStar.In).mp3" },
    { name: "Song 2", src: "Zayn_Malik_-_Like_I_Would.mp3" }
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    audioPlayer.play();
    updatePlaylistUI();
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

audioPlayer.addEventListener('timeupdate', () => {
    if (!isNaN(audioPlayer.duration)) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

function seekTo(event) {
    const percent = event.target.value;
    audioPlayer.currentTime = (percent / 100) * audioPlayer.duration;
}

function setVolume(value) {
    audioPlayer.volume = value;
}

function updatePlaylistUI() {
    playlistElement.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.name;
        li.onclick = () => {
            currentSongIndex = index;
            loadSong(index);
        };
        if (index === currentSongIndex) {
            li.style.backgroundColor = "#0af";
        }
        playlistElement.appendChild(li);
    });
}

function uploadSongs(event) {
    const files = event.target.files;
    for (let file of files) {
        const url = URL.createObjectURL(file);
        songs.push({ name: file.name, src: url });
    }
    updatePlaylistUI();
}

// Initial load
loadSong(currentSongIndex);