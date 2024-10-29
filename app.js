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
        alert("Please Enter the fields.....!")
    }
    if(signupPassword === conformPassword && userName !== "" && signupEmail !== "" && signupPassword !== "" && conformPassword!== ""){
        alert("Registration success....!")
    }
    else{
        alert("Registration failed.....!")
    }
 }
 // check login with local storage
 function sucessfullogin(){
    var email_login =document.getElementById("loginemail").value;
    var password_login =document.getElementById("loginPassword").value;

    var emailLogin = localStorage.getItem('signupEmail')
    var passwordLogin =localStorage.getItem('signupPassword')
    if (email_login === emailLogin && password_login === passwordLogin) {
        alert("Login success....!");
        localStorage.setItem("isLoggedIn", "true");
        document.getElementById("signupbutton").style.display = "none";
        document.getElementById("loginbutton").innerHTML = "LOG OUT";
    }
    else if(email_login===""&& password_login==""){
        alert("enter the fields")
    }
    else{
        alert("Login Failed......!")
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
