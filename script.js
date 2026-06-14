const tg = window.Telegram.WebApp;

tg.expand();

let user = tg.initDataUnsafe.user;

if(user){

document.getElementById("username").innerHTML =
"@" + (user.username || user.first_name);

document.getElementById("profileName").innerHTML =
"Name: " + user.first_name;

}

let joinedSlots =
localStorage.getItem("slots") || 0;

document.getElementById("slots").innerHTML =
"Slots: " + joinedSlots + "/50";

function joinTournament(){

if(joinedSlots >= 50){

alert("Tournament Full ❌");
return;

}

joinedSlots++;

localStorage.setItem(
"slots",
joinedSlots
);

document.getElementById("slots").innerHTML =
"Slots: " + joinedSlots + "/50";

alert(
"Tournament Joined Successfully 🔥"
);

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
document.getElementById("roomPage").classList.add("hidden");

if(page==="room")
document.getElementById("roomPage").classList.remove("hidden");
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
