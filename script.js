const tg = window.Telegram.WebApp;

tg.expand();

let user = tg.initDataUnsafe.user;

if(user){

document.getElementById("username").innerHTML =
"@" + (user.username || user.first_name);

document.getElementById("profileName").innerHTML =
"Name: " + user.first_name;

}

// Page Navigation

function showPage(page){

document.getElementById("homePage").classList.add("hidden");
document.getElementById("walletPage").classList.add("hidden");
document.getElementById("profilePage").classList.add("hidden");
document.getElementById("roomPage").classList.add("hidden");
document.getElementById("matchesPage").classList.add("hidden");

if(page==="home"){
document.getElementById("homePage").classList.remove("hidden");
}

if(page==="wallet"){
document.getElementById("walletPage").classList.remove("hidden");
}

if(page==="profile"){
document.getElementById("profilePage").classList.remove("hidden");
}

if(page==="room"){
document.getElementById("roomPage").classList.remove("hidden");
}

if(page==="matches"){
document.getElementById("matchesPage").classList.remove("hidden");
}

}

// Tournament Join

let joinedSlots =
localStorage.getItem("slots") || 0;

document.getElementById("slots").innerHTML =
"Slots: " + joinedSlots + "/50";

function joinTournament(){

let confirmJoin = confirm(
"Join FF Solo Tournament?\n\nEntry Fee: ৳10"
);

if(!confirmJoin){
return;
}

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

alert("Tournament Joined Successfully 🔥");

}

// UID Save

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

// Copy Room ID

function copyRoomId(){

navigator.clipboard.writeText("12345678");

alert("Room ID Copied ✅");

}

// Copy Password

function copyRoomPass(){

navigator.clipboard.writeText("FLOW123");

alert("Password Copied ✅");

}