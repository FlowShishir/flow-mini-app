const tg = window.Telegram.WebApp;

tg.expand();

let user = tg.initDataUnsafe.user;

if(user){

document.getElementById("username").innerHTML =
"@" + (user.username || user.first_name);

document.getElementById("profileName").innerHTML =
"Name: " + user.first_name;

}

function joinTournament(){

alert("Tournament Joined Successfully 🔥");

}

function showPage(page){

document.getElementById("homePage").classList.add("hidden");
document.getElementById("walletPage").classList.add("hidden");
document.getElementById("profilePage").classList.add("hidden");

if(page==="home")
document.getElementById("homePage").classList.remove("hidden");

if(page==="wallet")
document.getElementById("walletPage").classList.remove("hidden");

if(page==="profile")
document.getElementById("profilePage").classList.remove("hidden");

}

// UID Save System

function saveUID(){

let uid =
document.getElementById("uidInput").value;

localStorage.setItem("ff_uid", uid);

document.getElementById("savedUID").innerHTML =
"Saved UID: " + uid;

alert("UID Saved ✅");

}

let savedUID =
localStorage.getItem("ff_uid");

if(savedUID){

document.getElementById("savedUID").innerHTML =
"Saved UID: " + savedUID;

  }
