/* =========================================================
   JUNNU GIFT — ADMIN LOGIN
   ========================================================= */


/* =========================
   ELEMENTS
========================= */

const loginForm =
  document.getElementById("loginForm");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const loginBtn =
  document.getElementById("loginBtn");

const loginStatus =
  document.getElementById("loginStatus");


/* =========================
   BACKGROUND HEARTS
========================= */

const bg =
  document.getElementById("bg");


const HEART_SYMBOLS = [
  "♡",
  "♥",
  "✦",
  "✧",
  "❤"
];


function createHeart(){

  if(!bg) return;

  const heart =
    document.createElement("div");

  heart.className =
    "bg-heart";

  heart.textContent =
    HEART_SYMBOLS[
      Math.floor(
        Math.random() *
        HEART_SYMBOLS.length
      )
    ];

  heart.style.left =
    Math.random() * 100 + "%";

  heart.style.top =
    (65 + Math.random() * 35) + "%";

  heart.style.fontSize =
    (12 + Math.random() * 18) + "px";

  const duration =
    5 + Math.random() * 5;

  heart.style.animationDuration =
    duration + "s";

  bg.appendChild(heart);

  setTimeout(() => {

    heart.remove();

  }, duration * 1000 + 500);

}


setInterval(createHeart, 900);


/* =========================
   ADMIN LOGIN
========================= */

if(loginForm){

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const email =
        emailInput.value.trim();

      const password =
        passwordInput.value;


      if(!email || !password){

        showStatus(
          "⚠️ Email এবং password দাও।",
          "error"
        );

        return;

      }


      loginBtn.classList.add("loading");

      loginBtn.textContent =
        "Logging in...";


      showStatus(
        "🔐 যাচাই করা হচ্ছে...",
        ""
      );


      try{

        const {
          data,
          error
        } =
        await supabaseClient.auth.signInWithPassword({

          email: email,

          password: password

        });


        if(error){

          throw error;

        }


        if(!data || !data.user){

          throw new Error(
            "Login failed."
          );

        }


        showStatus(
          "✅ Login successful!",
          "success"
        );


        loginBtn.textContent =
          "Success ❤️";


        /*
          এখন Dashboard বানানো হবে।
          Dashboard তৈরি হলে এখানে
          automatically redirect করব।
        */

        setTimeout(() => {

          window.location.href =
            "dashboard.html";

        }, 800);


      }catch(error){

        console.error(
          "Admin login error:",
          error
        );


        showStatus(
          getLoginErrorMessage(error),
          "error"
        );


        loginBtn.classList.remove(
          "loading"
        );

        loginBtn.textContent =
          "Login ❤️";

      }

    }
  );

}


/* =========================
   STATUS MESSAGE
========================= */

function showStatus(
  message,
  type = ""
){

  if(!loginStatus) return;

  loginStatus.textContent =
    message;

  loginStatus.className =
    "status";

  if(type){

    loginStatus.classList.add(
      type
    );

  }

}


/* =========================
   ERROR MESSAGE
========================= */

function getLoginErrorMessage(error){

  const message =
    String(
      error?.message || ""
    ).toLowerCase();


  if(
    message.includes(
      "invalid login credentials"
    )
  ){

    return "❌ Email অথবা password ভুল।";

  }


  if(
    message.includes(
      "email not confirmed"
    )
  ){

    return "⚠️ Admin email এখনো confirm করা হয়নি।";

  }


  if(
    message.includes(
      "too many requests"
    )
  ){

    return "⏳ অনেকবার চেষ্টা হয়েছে। একটু পরে আবার চেষ্টা করো।";

  }


  return (
    "❌ Login করা যায়নি। আবার চেষ্টা করো।"
  );

}
