let songIndex = 0;
let audioElement = new Audio('../songs/2.mp3');
let ctrlIcon = document.getElementById("ctrlIcon");
let myProgessBar = document.getElementById('myProgessBar');
let gif = document.getElementById('gif');
let prevIcon = document.getElementById("prevIcon");
let nextIcon = document.getElementById("nextIcon");

let songs = [
    { songName: "Shape of You", filePath: "../songs/1.mp3", coverPath: "../images/1.jpg" },
    { songName: "Blinding Lights", filePath: "../songs/2.mp3", coverPath: "../images/7.jpg" },
    { songName: "Havana", filePath: "../songs/3.mp3", coverPath: "../images/3.jpg" },
    { songName: "Perfect", filePath: "../songs/4.mp3", coverPath: "../images/7.jpg" },
    { songName: "Senorita", filePath: "../songs/5.mp3", coverPath: "../images/5.jpg" },
    { songName: "Believer", filePath: "../songs/6.mp3", coverPath: "../images/6.jpg" },
    { songName: "Levitating", filePath: "../songs/7.mp3", coverPath: "../images/4.jpg" },
    { songName: "Despacito", filePath: "../songs/8.mp3", coverPath: "../images/2.jpg" },
    { songName: "Stay", filePath: "../songs/9.mp3", coverPath: "../images/3.jpg" },
    { songName: "Faded", filePath: "../songs/10.mp3", coverPath: "../images/7.jpg" },
];

function playSong() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
        audioElement.pause();
        
    } else {
        audioElement.play();
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
        
    }
}

function playSongByIndex(index) {
    // Reset the icon of the previously playing song (if any)
    const previousIcon = document.querySelector('.fa-pause[data-index]');
    if (previousIcon) {
        previousIcon.classList.remove('fa-pause');
        previousIcon.classList.add('fa-play');
    }

    // Update the audio source to the selected song's file path
    audioElement.src = songs[index].filePath;

    // Play the selected song
    audioElement.play();

    // Update the control icon to "pause"
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');

    // Update the new song's play icon to "pause" in the playlist
    const currentIcon = document.querySelector(`.fa-play[data-index="${index}"]`);
    if (currentIcon) {
        currentIcon.classList.remove('fa-play');
        currentIcon.classList.add('fa-pause');
    }
}



audioElement.onloadedmetadata = function () {
    myProgessBar.max = audioElement.duration;
    myProgessBar.value = audioElement.currentTime;
};
setInterval(function(){
    myProgessBar.value = audioElement.currentTime;
},2000);

myProgessBar.onchange = function () {
    audioElement.currentTime = myProgessBar.value;
    audioElement.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
};


// Dynamically create playlist
const playlist = document.getElementById('playlist');

// Function to create each song item in the playlist
function createSongItem(song, index) {
    const songItem = document.createElement('div');
    songItem.className = "flex justify-between items-center w-[280px] px-3 py-2 h-10 bg-white rounded-xl";
    songItem.innerHTML = `
      <img src="${song.coverPath}" alt="${song.songName}" class="h-4 w-4 rounded-full" />
      <h3>${song.songName}</h3>
      <p><i class="fa-solid fa-play" data-index="${index}"></i></p>
    `;
    playlist.appendChild(songItem);
}

// Populate the playlist with song items
songs.forEach((song, index) => createSongItem(song, index));


playlist.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-play')) {
        songIndex = parseInt(e.target.getAttribute('data-index'));
        playSongByIndex(songIndex);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
    } else if (e.target.classList.contains('fa-pause')) {
        audioElement.pause();
        e.target.classList.remove('fa-pause');
        e.target.classList.add('fa-play');
    }})

prevIcon.addEventListener('click',()=>{
    
})
prevIcon.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop to last song if it's the first
    playSongByIndex(songIndex);
});

nextIcon.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Loop to first song if it's the last
    playSongByIndex(songIndex);
});