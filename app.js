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
document.addEventListener("DOMContentLoaded", function() {
    // Display or hide buttons based on login status
    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("signupbutton").style.display = "none";
        document.getElementById("loginbutton").innerHTML = "LOG OUT";
    } else {
        document.getElementById("loginbutton").innerHTML = "LOGIN";
    }

    // Toggle visibility of the signup and login forms
    document.getElementById("signupbutton").addEventListener("click", function() {
        document.getElementById("myform").style.display = "block";
        document.getElementById("myformlogin").style.display = "none";
    });

    document.getElementById("loginbutton").addEventListener("click", function() {
        
        if (localStorage.getItem("isLoggedIn") === "true") {
            // Log out if already logged in
            localStorage.removeItem("isLoggedIn");
            document.getElementById("signupbutton").style.display = "block";
            document.getElementById("loginbutton").innerHTML = "LOGIN";
            alert("Logged out successfully!");
        } else {
            // Show login form if not logged in
            document.getElementById("myformlogin").style.display = "block";
            document.getElementById("myform").style.display = "none";
        }
    });
});
document.querySelector('.fa-xmark').addEventListener("click", function() {
    document.querySelector('.form').style.display="none";
});
document.querySelector('#close').addEventListener("click", function() {
    document.querySelector('.loginform').style.display="none";
});
//
function load(){
    document.getElementById("pause").style.display = "none";
}
// to change pause and play buttons alternatively
document.getElementById("play").addEventListener("click", function() {
    document.getElementById("play").style.display = "none";
    document.getElementById("pause").style.display = "block";
});

document.getElementById("pause").addEventListener("click", function() {
    document.getElementById("pause").style.display = "none";
    document.getElementById("play").style.display = "block";
});
//dark and light mode
let flag = 0;
document.querySelector(".fa-lightbulb").addEventListener("click", function() {
    if (flag === 0) {
        document.body.style.backgroundColor = "white";
        document.querySelector("body").style.color="black"
        document.querySelector(".fa-lightbulb").style.color="black"
        flag = 1;
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        document.querySelector(".fa-lightbulb").style.color="goldenrod"
        flag = 0;
    }
});
//recentlt played and based on played
function createSongContainer(){
    let songContainer = document.createElement("div")
    songContainer.className="recentlyplayed"
    for(i=0;i<songs.length;i++){
        songContainer.innerHTML+=`<div id="card">
        <h1>${songs[i].songname}</h1>
        <img src="${songs[i].cover}" />
        <h2>${songs[i].artist}</h2>`
    }
    return songContainer
}
let recentlyPlayedContainer = createSongContainer()
let basedOnPlayedContainer = createSongContainer()
document.querySelector(".recently-played").appendChild(recentlyPlayedContainer)
document.querySelector(".basedon-played").appendChild(basedOnPlayedContainer)

 // Prevent the event from bubbling up
if (localStorage.getItem("isLoggedIn") !== "true"){
    musicPlayerSection.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });
}
else{
// Select the necessary elements
const musicPlayerSection = document.querySelector('.music-player-section');
const maximizeMusicPlayerSection = document.querySelector('.maximize-music-player-section');
const angleDownIcon = document.querySelector('.fa-angle-down');
const homeContent = document.querySelector('.home');

// Initially hide the maximize music player section
maximizeMusicPlayerSection.style.display = 'none';

// Function to show the maximize music player section
musicPlayerSection.addEventListener('click', () => {
    // Hide the home content
    homeContent.style.display = 'none'; 
    musicPlayerSection.style.display = 'none';
    maximizeMusicPlayerSection.style.display = 'flex'; 
    maximizeMusicPlayerSection.style.opacity = 0;
    setTimeout(() => {
        maximizeMusicPlayerSection.style.transition = 'opacity 0.5s';
        maximizeMusicPlayerSection.style.opacity = 1;
    }, 10);
});

// Function to hide the maximize music player section and show the home content
angleDownIcon.addEventListener('click', () => {
    maximizeMusicPlayerSection.style.transition = 'opacity 0.5s';
    maximizeMusicPlayerSection.style.opacity = 0; 
    setTimeout(() => {
        maximizeMusicPlayerSection.style.display = 'none';
        musicPlayerSection.style.display = 'flex';
        musicPlayerSection.style.flexDirection = 'column';
        homeContent.style.display = 'block'; 
    }, 500);
});
}
