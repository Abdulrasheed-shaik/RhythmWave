// store the data in local storage when we click signup
 function signupSubmit(){
    var userName = document.getElementById("username").value;
    var signupEmail = document.getElementById("email").value;
    var signupPassword = document.getElementById("signupPassword").value;
    var conformPassword = document.getElementById("conformPassword").value;
    if(userName !== "" && signupEmail !== "" && signupPassword !== "" && conformPassword!== ""){
        var nameSignup=localStorage.setItem('userName',userName);
        var emailSignup=localStorage.setItem('signupEmail', signupEmail);
        var passwordSignup=localStorage.setItem('signupPassword',signupPassword);
        var conformPasswordSignup = localStorage.setItem('conformPassword',conformPassword); 
    }
    else{
        // Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "Enter the Fields",
        //   });
    }
    if(signupPassword === conformPassword && userName !== "" && signupEmail !== "" && signupPassword !== "" && conformPassword!== ""){
        Swal.fire({
            title: "Registration Sucess.....!!",
            icon: "success"
          });
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Registration Failed",
          });
    }
 }
 // check login with local storage
 function sucessfullogin(){
    var email_login =document.getElementById("loginemail").value;
    var password_login =document.getElementById("loginPassword").value;

    var emailLogin = localStorage.getItem('signupEmail')
    var passwordLogin =localStorage.getItem('signupPassword')
    if (email_login === emailLogin && password_login === passwordLogin) {
        Swal.fire({
            title: "Login Sucess.....!!",
            icon: "success"
          });
        localStorage.setItem("isLoggedIn", "true");
        document.getElementById("signupbutton").style.display = "none";
        document.getElementById("loginbutton").innerHTML = "LOG OUT";
    }
    else if(email_login===""&& password_login==""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter the Fields",
          });
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login Failed",
          });
    }
 }


// Check login status on page load
// Check login status on page load
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("signupbutton").style.display = "none";
        document.getElementById("loginbutton").innerHTML = "LOG OUT";
        document.querySelector('.home').classList.remove('blur');
    } else {
        document.getElementById("loginbutton").innerHTML = "LOGIN";
        document.querySelector('.home').classList.add('blur');
    }

    document.getElementById("signupbutton").addEventListener("click", function() {
        document.getElementById("myform").style.display = "block";
        document.getElementById("myformlogin").style.display = "none";
    });

    document.getElementById("loginbutton").addEventListener("click", function() {
        if (localStorage.getItem("isLoggedIn") === "true") {
            localStorage.removeItem("isLoggedIn");
            document.getElementById("signupbutton").style.display = "block";
            document.getElementById("loginbutton").innerHTML = "LOGIN";
            Swal.fire("Logged out successfully!");
            document.querySelector('.home').classList.add('blur');
        } else {
            document.getElementById("myformlogin").style.display = "block";
            document.getElementById("myform").style.display = "none";
        }
    });
});

// Restrict access to the music player if not logged in
function maximizeFunction() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        homeContent.style.display = 'none'; 
        musicPlayerSection.style.display = 'none';
        maximizeMusicPlayerSection.style.display = 'flex';
        maximizeMusicPlayerSection.style.opacity = 0;
        document.querySelector('header').style.display = 'none';
        setTimeout(() => {
            maximizeMusicPlayerSection.style.transition = 'opacity 0.5s';
            maximizeMusicPlayerSection.style.opacity = 1;
        }, 10);
    } else {
        Swal.fire({
            icon: "warning",
            title: "Access Denied",
            text: "Please log in to access the music player.",
        });
    }
}

// Ensure music player section is hidden if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
    document.querySelector('.home').classList.add('blur');
}
//
//dark and light mode
let flag = 0; // 0 for light mode, 1 for dark mode

function lightMode() {
    document.body.style.backgroundColor = "white"; // Set background to white
    document.body.style.color = "black"; // Set text color to black
    document.querySelectorAll('.glass').forEach(element => {
        element.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // Light glass effect
    });
    flag = 1; // Update flag to indicate light mode
}

function darkMode() {
    document.body.style.backgroundColor = "black"; // Set background to black
    document.body.style.color = "white"; // Set text color to white
    document.querySelectorAll('.glass').forEach(element => {
        element.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Dark glass effect
    });
    flag = 0; // Update flag to indicate dark mode
}

// Event listener for the lightbulb icon
document.querySelector(".fa-moon").addEventListener("click", function() {
    (flag === 0) ? lightMode() : darkMode();
});
//recentlt played and based on played
function createSongContainer(songs) {
    let songContainer = document.createElement("div");
    songContainer.className = "recentlyplayed";
    
    // Loop through the songs and create a card for each
    for (let i = 0; i < songs.length; i++) {
        const songCard = document.createElement("div");
        songCard.id = "card";
        
        songCard.innerHTML = `
            <h1>${songs[i].songname}</h1>
            <img src="${songs[i].cover}" />
            <h2>${songs[i].artist}</h2>
        `;
        
        // Add click event listener to each card
        songCard.addEventListener("click", () => playSong(i)); // Pass the index to play the song

        // Append the song card to the song container
        songContainer.appendChild(songCard);
    }
    return songContainer;
}

// Create song containers for recently played and based on played
let recentlyPlayedContainer = createSongContainer(songs);
let basedOnPlayedContainer = createSongContainer(songs);

// Append the containers to their respective divs in the DOM
document.querySelector(".recently-played").appendChild(recentlyPlayedContainer);
document.querySelector(".basedon-played").appendChild(basedOnPlayedContainer);

// Function to play a song by index
function playSong(songIndex) {
    const selectedSong = songs[songIndex];
    
    // Update audio source and UI elements
    const audio = document.getElementById("audio-source");
    const songTitle = document.getElementById("songTitle");
    const maximizeSongTitle = document.getElementById("maximize-songTitle");
    const maximizeArtist = document.getElementById("maximize-artist");
    const minimizeImg = document.getElementById("minimize-img");
    const maximizeImg = document.getElementById("maximize-Img");

    audio.src = selectedSong.path;
    songTitle.textContent = selectedSong.songname;
    maximizeSongTitle.textContent = selectedSong.songname;
    maximizeArtist.textContent = selectedSong.artist;
    minimizeImg.src = selectedSong.cover;
    maximizeImg.src = selectedSong.cover;

    // Play the song
    audio.play();

    // Update play button to show pause icon
    document.getElementById("play").classList.remove("fa-play");
    document.getElementById("play").classList.add("fa-pause");
}


 // Prevent the event from bubbling up
if (localStorage.getItem("isLoggedIn") !== "true"){
    musicPlayerSection.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });
}
else{
    // Select the necessary elements
const musicPlayerSection = document.querySelector('.current-song-name');
const maximizeMusicPlayerSection = document.querySelector('.maximize-music-player-section');
const angleDownIcon = document.querySelector('.fa-angle-down');
const homeContent = document.querySelector('.home');

// Initially hide the maximize music player section
maximizeMusicPlayerSection.style.display = 'none';

// Function to show the maximize music player section

function maximizeFunction(){
    // Hide the home content
    homeContent.style.display = 'none'; 
    musicPlayerSection.style.display = 'none';
    maximizeMusicPlayerSection.style.display = 'flex'; 
    maximizeMusicPlayerSection.style.opacity = 0;
    document.querySelector('header').style.display='none'
    setTimeout(() => {
        maximizeMusicPlayerSection.style.transition = 'opacity 0.5s';
        maximizeMusicPlayerSection.style.opacity = 1;
    }, 10);
}
function angleDownFunction(){
    maximizeMusicPlayerSection.style.transition = 'opacity 0.5s';
    maximizeMusicPlayerSection.style.opacity = 0; 
    setTimeout(() => {
        maximizeMusicPlayerSection.style.display = 'none';
        musicPlayerSection.style.display = 'flex';
        musicPlayerSection.style.flexDirection = 'column';
        homeContent.style.display = 'block'; 
        document.querySelector('header').style.display='flex'
    }, 500);       
}
// Function to hide the maximize music player section and show the home content
musicPlayerSection.addEventListener('click', maximizeFunction);
angleDownIcon.addEventListener('click', angleDownFunction);
}

// music funtions 
const image = document.getElementById("carouselImg")
const maximizeImage = document.getElementById("maximize-Img")
const minimizeImage = document.getElementById('minimize-img')
const title = document.getElementById('songTitle')
const maximizetitle = document.getElementById('maximize-songTitle')
const maximizeArtist = document.getElementById('maximize-artist')
const music = document.querySelector('audio')
const currentTime1 = document.getElementById('current-time')
const duration1 = document.getElementById('duration')
const progess = document.getElementById('progess')
const musicTrack = document.getElementById('progess-container')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const repeatSong= document.getElementById('repeatSong')
const reverseten = document.getElementById('backward')
const forwardten = document.getElementById('forward')
const maximizenextBtn = document.getElementById('maximize-next')
const imageContainer = document.querySelector('.maximize-poster');
// check sonf is play or not
let isPlaying = false
//play
function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    // maximizeplayBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title','pause')
    music.play()
    imageContainer.style.animationPlayState = 'running';
}
//pause
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    // maximizeplayBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title','play')
    music.pause()
    imageContainer.style.animationPlayState = 'paused';
    
}
//play or pause event
playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()))
// maximizeplayBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()))

//update Dom
function loadSong(song){
    title.textContent = song.songname
    maximizetitle.textContent = song.songname
    maximizeArtist.textContent = song.artist
    music.src = `${song.path}`
    image.src = `${song.cover}` 
    maximizeImage.src = `${song.cover}`
    minimizeImage.src = `${song.cover}`
}
// current song
let songIndex=0
//previous song
function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong()
}
//next song
function nextSong(){
    songIndex++
    if(songIndex > songs.length -1){
        songIndex = 0;
        document.querySelector('.fa-heart').reset
    }
    loadSong(songs[songIndex]);
    playSong()
}

//on load - first song
loadSong(songs[songIndex])
//update progress bar& time
function updateProgressBase(e){
    if(isPlaying){
        const {duration, currentTime} =e.srcElement;
        //update progess bar & time
        const progressPercent = (currentTime/duration)*100
        progess.style.width=`${progressPercent}%`
        //calculate duration 
        const durationMinutes = Math.floor(duration/60)
        let durationSeconds = Math.floor(duration%60)
        if(durationSeconds<10){
            durationSeconds =`0${durationSeconds}`
        }
        //delay switching suration to avoid NaN
        if(durationSeconds){
            duration1.textContent = `${durationMinutes}:${durationSeconds}`
        }
        //current time
        const currentMinutes = Math.floor(currentTime /60)
        let currentSeconds = Math.floor(currentTime%60)
        if(currentSeconds < 10){
            currentSeconds=`0${currentSeconds}`
        }
        currentTime1.textContent=`${currentMinutes}:${currentSeconds}`
    }
    //set progress bar
    
}
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    const {duration} =music
    music.currentTime = (clickX/width)*duration;
}
function minimizerepeatSong(){
    music.currentTime=0
}
function reverseTen(){
    if(music.currentTime>10){
        music.currentTime-=10
    }
}
function forwardTen(){
        music.currentTime+=10
}
// previous ans next events
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
repeatSong.addEventListener('click',minimizerepeatSong)
//backward ans forward events
reverseten.addEventListener('click',reverseTen)
forwardten.addEventListener('click',forwardTen)
//time update event
music.addEventListener('timeupdate',updateProgressBase)
musicTrack.addEventListener('click',setProgressBar)

// Select necessary elements
const audio = document.getElementById("audio-source");
const volumeIcon = document.querySelector(".fa-volume-high");
let volumeRange = document.createElement("input");

// Add volume range slider below the icon
volumeRange.type = "range";
volumeRange.min = "0";
volumeRange.max = "1";
volumeRange.step = "0.1";
volumeRange.value = "1"; // Initial full volume
volumeRange.classList.add("volume-slider");
volumeIcon.parentNode.insertBefore(volumeRange, volumeIcon.nextSibling);

// Function to toggle mute/unmute
let isMuted = false;
volumeIcon.addEventListener("click", () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    volumeIcon.classList.toggle("fa-volume-mute", isMuted);
    volumeIcon.classList.toggle("fa-volume-high", !isMuted);
    volumeRange.value = isMuted ? "0" : audio.volume;
});

// Adjust audio volume when moving the slider
volumeRange.addEventListener("input", (e) => {
    audio.volume = e.target.value;
    isMuted = e.target.value === "0";
    audio.muted = isMuted;
    volumeIcon.classList.toggle("fa-volume-mute", isMuted);
    volumeIcon.classList.toggle("fa-volume-high", !isMuted);
});

let addFavourite = document.querySelector('.fa-heart');
let click=0
addFavourite.addEventListener('click', function() {
    if (click==0) {
        addFavourite.style.color="red"
        click=1
    } else {
        addFavourite.style.color=""
        click=0
    }
});

// playlist
let play=0
    document.querySelector('.bxs-playlist').addEventListener('click',function(){
        if(play==0){
            document.querySelector('.playlist').style.display="flex"
            play=1
        }
        else{
            document.querySelector('.playlist').style.display="none"
            play=0
        }
        
    })
function addPlay() {
    let addPlayList = document.createElement("div");
    addPlayList.className = "playlistadd";
    for (let i = 0; i < songs.length; i++) {
        addPlayList.innerHTML += `
            <div id="playlistcard" data-song-index="${i}">
                <img src="${songs[i].cover}" />
                <marquee behavior="" width="30%" direction="left" height="30px">
                    <h2>${songs[i].songname}</h2>
                </marquee>
                <i class="fa-solid fa-heart" id="favourite" title="Add to favourite"></i>
                <i class="fa-solid fa-play" id="play" title="play"></i>
            </div>`;
    }
    return addPlayList;
}

let add = addPlay();
document.querySelector('.playlist').appendChild(add);

// Add an event listener to each song card to load and play the selected song
document.querySelectorAll('#playlistcard').forEach((card) => {
    card.addEventListener('click', function () {
        let songIndex = this.getAttribute('data-song-index');
        loadSong(songs[songIndex]);  // Load the selected song
        playSong();                   // Play the song
        maximizeFunction();           // Maximize the play section to occupy the whole screen
    });
});

// Function to render songs to the search results section
function renderSearchResults(songs) {
    const searchResultsDiv = document.getElementById("search-results");
    const searchResultsTitle = document.getElementById("search-results-title");
    
    searchResultsDiv.innerHTML = ""; // Clear existing content
    
    if (songs.length === 0) {
        searchResultsTitle.style.display = "none"; // Hide title if no results
        searchResultsDiv.style.display = "none"; // Hide results div if no results
    } else {
        searchResultsTitle.style.display = "block"; // Show title if results are present
        searchResultsDiv.style.display = "flex"; // Show results div if results are present
        
        // Render each song in search results
        songs.forEach((song, index) => {
            const songCard = document.createElement("div");
            songCard.className = "song-card";
            songCard.innerHTML = `
                <img src="${song.cover}" alt="${song.songname}" class="song-cover" />
                <div class="song-details">
                    <h2>${song.songname}</h2>
                    <h3>${song.artist}</h3>
                </div>
            `;
            
            // Add click event to play the song
            songCard.addEventListener("click", () => playSong(index));
            searchResultsDiv.appendChild(songCard);
        });
    }
}

// Function to render songs to the search results section
function renderSearchResults(songs) {
    const searchResultsDiv = document.getElementById("search-results");
    const searchResultsTitle = document.getElementById("search-results-title");
    
    searchResultsDiv.innerHTML = ""; // Clear existing content
    
    if (songs.length === 0) {
        searchResultsTitle.style.display = "none"; // Hide title if no results
        searchResultsDiv.style.display = "none"; // Hide results div if no results
    } else {
        searchResultsTitle.style.display = "block"; // Show title if results are present
        searchResultsDiv.style.display = "flex"; // Show results div if results are present
        
        // Render each song in search results
        songs.forEach((song, index) => {
            const songCard = document.createElement("div");
            songCard.className = "song-card";
            songCard.innerHTML = `
                <img src="${song.cover}" alt="${song.songname}" class="song-cover" />
                <div class="song-details">
                    <h2>${song.songname}</h2>
                    <h3>${song.artist}</h3>
                </div>
            `;
            
            // Add click event to play the song
            songCard.addEventListener("click", () => playSong(index));
            searchResultsDiv.appendChild(songCard);
        });
    }
}

// Function to play a song by index
function playSong(songIndex) {
    const selectedSong = songs[songIndex];
    
    // Update audio source and UI elements
    const audio = document.getElementById("audio-source");
    const songTitle = document.getElementById("songTitle");
    const maximizeSongTitle = document.getElementById("maximize-songTitle");
    const maximizeArtist = document.getElementById("maximize-artist");
    const minimizeImg = document.getElementById("minimize-img");
    const maximizeImg = document.getElementById("maximize-Img");

    audio.src = selectedSong.path;
    songTitle.textContent = selectedSong.songname;
    maximizeSongTitle.textContent = selectedSong.songname;
    maximizeArtist.textContent = selectedSong.artist;
    minimizeImg.src = selectedSong.cover;
    maximizeImg.src = selectedSong.cover;

    // Play the song
    audio.play();

    // Update play button to show pause icon
    document.getElementById("play").classList.remove("fa-play");
    document.getElementById("play").classList.add("fa-pause");
}

// Add event listener to header search bar
document.getElementById("headerSearchBar").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    
    if (searchTerm === "") {
        // Clear search results if search term is empty
        renderSearchResults([]);
    } else {
        // Filter songs based on search term
        const filteredSongs = songs.filter(song =>
            song.songname.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        );
        
        // Render filtered songs to search results
        renderSearchResults(filteredSongs);
    }
});




