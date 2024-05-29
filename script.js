let songs = [];
let currentSongIndex = 0;
const audioPlayer = document.getElementById('audioPlayer');
const songImage = document.getElementById('songImage');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songDuration = document.getElementById('songDuration');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slider = document.getElementById('myRange');
const output = document.getElementById('rango');

function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.name;
    songArtist.textContent = song.artist;
    songDuration.textContent = song.duration;
    songImage.src = song.img;
    audioPlayer.src = song.path;
}

function playSong() {
    audioPlayer.play();
    playBtn.textContent = 'pause';
    songImage.classList.add('rotating');
}

function pauseSong() {
    audioPlayer.pause();
    playBtn.textContent = 'play_arrow';
    songImage.classList.remove('rotating');
}

playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    pauseSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    pauseSong();
});

slider.oninput = function() {
    output.innerHTML = this.value;
    audioPlayer.volume = this.value / 100;
}

fetch('canciones.json')
    .then(response => response.json())
    .then(data => {
        songs = data;
        loadSong(currentSongIndex);
        output.innerHTML = slider.value;
        audioPlayer.volume = slider.value / 100;
    })
    .catch(error => console.error('Error loading songs:', error));
