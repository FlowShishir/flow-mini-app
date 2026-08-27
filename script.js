/* =========================================================
   JUNNU GIFT WEBSITE
   JavaScript
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */


/*
  HER PHOTOS
*/

const HER_PHOTOS = [
  "assets/images/her-01.jpg",
  "assets/images/her-02.jpg",
  "assets/images/her-03.jpg",
  "assets/images/her-04.jpg"
];


/*
  MY PHOTOS
*/

const MY_PHOTOS = [
  "assets/images/my-01.jpg",
  "assets/images/my-02.jpg",
  "assets/images/my-03.jpg",
  "assets/images/my-04.jpg"
];


/*
  COUPLE PHOTOS

  এখানে এখন শুধু ১টা ছবি থাকবে।
*/

const COUPLE_PHOTOS = [
  "assets/images/couple-01.jpg"
];


/*
  GIRL VIDEOS
*/

const GIRL_VIDEOS = [
  "assets/videos/her-01.mp4",
  "assets/videos/her-02.mp4",
  "assets/videos/her-03.mp4"
];


/*
  SPECIAL VIDEO
*/

const SPECIAL_VIDEO =
  "assets/videos/special.mp4";


/*
  Background floating symbols.
*/

const PARTICLE_SYMBOLS = [
  "♡",
  "♥",
  "✦",
  "✧",
  "⋆",
  "❤",
  "•"
];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const openScreen =
  document.getElementById("open");

const exp =
  document.getElementById("exp");

const goButton =
  document.getElementById("go");

const typingElement =
  document.getElementById("typing");

const envelope =
  document.getElementById("env");

const envelopeHint =
  document.getElementById("eh");

const surprise =
  document.getElementById("surprise");

const surpriseButton =
  document.getElementById("rb");

const surpriseText =
  document.getElementById("u");

const specialMessage =
  document.getElementById("specialMessage");

const background =
  document.getElementById("bg");

const girlVideo =
  document.getElementById("girlVideo");

const girlVideoWrap =
  document.getElementById("girlVideoWrap");

const girlStatus =
  document.getElementById("girlStatus");

const girlDownload =
  document.getElementById("girlDownload");

const specialPlayer =
  document.getElementById("specialPlayer");

const specialDownload =
  document.getElementById("specialDownload");

const coupleGrid =
  document.getElementById("coupleGrid");

const backTopButton =
  document.getElementById("backTopBtn");


/* =========================================================
   LETTER TEXT
   ========================================================= */

const LETTER_TYPING_TEXT =
  "তুমি আমার জীবনের এমন একজন মানুষ, যাকে ভুলে যাওয়া আমার কাছে নিজের একটা অংশকে ভুলে যাওয়ার মতো। তোমাকে পেয়ে আমি সত্যিই কৃতজ্ঞ।";


/* =========================================================
   OPEN GIFT
   ========================================================= */

let giftOpened = false;

if (goButton){

  goButton.addEventListener("click", () => {

    if (giftOpened) return;

    giftOpened = true;

    openScreen.style.display = "none";

    exp.classList.add("show");

    startTyping();

    createBackgroundEffects();


    setTimeout(() => {

      surprise.classList.add("show");

    }, 2200);


    setTimeout(() => {

      document.querySelector("#exp section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }, 300);

  });

}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

function startTyping(){

  if (!typingElement) return;

  typingElement.textContent = "";

  let index = 0;

  const speed = 32;

  function type(){

    if (index >= LETTER_TYPING_TEXT.length) {
      return;
    }

    typingElement.textContent +=
      LETTER_TYPING_TEXT[index];

    index++;

    setTimeout(type, speed);

  }

  type();

}


/* =========================================================
   ENVELOPE
   ========================================================= */

let envelopeOpened = false;

if (envelope){

  envelope.addEventListener("click", () => {

    if (envelopeOpened) return;

    envelopeOpened = true;

    envelope.classList.add("open");


    if (envelopeHint){

      envelopeHint.textContent =
        "💗 তোমার জন্য একটা ছোট্ট চিঠি...";

    }


    setTimeout(() => {

      surprise.classList.add("show");

    }, 1200);

  });

}


/* =========================================================
   SURPRISE BUTTON
   ========================================================= */

let surpriseOpened = false;

if (surpriseButton){

  surpriseButton.addEventListener("click", () => {

    if (surpriseOpened) return;

    surpriseOpened = true;

    surpriseText.classList.add("show");


    setTimeout(() => {

      specialMessage.classList.add("show");

    }, 700);


    createHeartBurst(18);

  });

}


/* =========================================================
   CAPTION CARDS
   ========================================================= */

const captionCards =
  document.querySelectorAll(".caption-card");


captionCards.forEach(card => {

  card.addEventListener("click", () => {

    card.classList.toggle("open");

  });

});


/* =========================================================
   BACKGROUND PARTICLES
   ========================================================= */

function createBackgroundEffects(){

  for (let i = 0; i < 32; i++){

    createSpark();

  }


  setInterval(() => {

    createParticle();

  }, 850);

}


function createSpark(){

  if (!background) return;

  const spark =
    document.createElement("div");

  spark.className = "spark";

  spark.style.left =
    Math.random() * 100 + "%";

  spark.style.top =
    Math.random() * 100 + "%";

  spark.style.animationDelay =
    Math.random() * 2 + "s";

  background.appendChild(spark);

}


function createParticle(){

  if (!background) return;

  const particle =
    document.createElement("div");

  particle.className = "particle";

  particle.textContent =
    PARTICLE_SYMBOLS[
      Math.floor(
        Math.random() *
        PARTICLE_SYMBOLS.length
      )
    ];


  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.top =
    65 + Math.random() * 35 + "%";


  particle.style.fontSize =
    (12 + Math.random() * 20) + "px";


  particle.style.color =
    Math.random() > .5
      ? "#ffabc9"
      : "#d8b5ff";


  const duration =
    5 + Math.random() * 5;


  particle.style.animationDuration =
    duration + "s";


  background.appendChild(particle);


  setTimeout(() => {

    particle.remove();

  }, duration * 1000 + 500);

}


/* =========================================================
   HEART BURST
   ========================================================= */

function createHeartBurst(amount = 15){

  for (let i = 0; i < amount; i++){

    const heart =
      document.createElement("div");

    heart.textContent =
      Math.random() > .5
        ? "♥"
        : "♡";


    heart.style.position =
      "fixed";

    heart.style.left =
      "50%";

    heart.style.top =
      "50%";

    heart.style.zIndex =
      "9999";

    heart.style.pointerEvents =
      "none";

    heart.style.color =
      "#ffabc9";

    heart.style.fontSize =
      (14 + Math.random() * 18) + "px";

    heart.style.textShadow =
      "0 0 15px #ff4e91";


    document.body.appendChild(heart);


    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      80 + Math.random() * 180;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;


    heart.animate(

      [

        {
          transform:
            "translate(-50%,-50%) scale(.4)",
          opacity: 1
        },

        {
          transform:
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`,
          opacity: 0
        }

      ],

      {

        duration:
          900 + Math.random() * 700,

        easing:
          "cubic-bezier(.22,.61,.36,1)",

        fill:
          "forwards"

      }

    );


    setTimeout(() => {

      heart.remove();

    }, 1800);

  }

}


/* =========================================================
   SLIDESHOW ENGINE
   ========================================================= */

function createSlideshow({

  imageElement,
  dotsElement,
  countElement,
  images,
  interval = 4200

}){

  if (!imageElement || !dotsElement){
    return;
  }


  if (!images || images.length === 0){

    imageElement.removeAttribute("src");

    if (countElement){

      countElement.textContent =
        "No photos";

    }

    return;

  }


  let current = 0;


  /*
    Create dots.
  */

  dotsElement.innerHTML = "";


  images.forEach((_, index) => {

    const dot =
      document.createElement("span");

    dot.className = "dot";


    if (index === 0){

      dot.classList.add("active");

    }


    dot.addEventListener("click", () => {

      current = index;

      showSlide();

    });


    dotsElement.appendChild(dot);

  });


  const dots =
    dotsElement.querySelectorAll(".dot");


  function showSlide(){

    imageElement.classList.remove("active");


    setTimeout(() => {

      imageElement.src =
        images[current];

      imageElement.classList.add("active");

    }, 80);


    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index === current
      );

    });


    if (countElement){

      countElement.textContent =
        `${current + 1} / ${images.length}`;

    }

  }


  /*
    Initial image.
  */

  imageElement.src =
    images[0];

  imageElement.classList.add("active");


  if (countElement){

    countElement.textContent =
      `1 / ${images.length}`;

  }


  /*
    Automatic slideshow.
  */

  if (images.length > 1){

    setInterval(() => {

      current =
        (current + 1) % images.length;

      showSlide();

    }, interval);

  }

}


/* =========================================================
   HER PHOTO SLIDESHOW
   ========================================================= */

createSlideshow({

  imageElement:
    document.getElementById("herImg"),

  dotsElement:
    document.getElementById("herDots"),

  countElement:
    document.getElementById("herCount"),

  images:
    HER_PHOTOS,

  interval:
    4500

});


/* =========================================================
   MY PHOTO SLIDESHOW
   ========================================================= */

createSlideshow({

  imageElement:
    document.getElementById("myImg"),

  dotsElement:
    document.getElementById("myDots"),

  countElement:
    document.getElementById("myCount"),

  images:
    MY_PHOTOS,

  interval:
    4500

});


/* =========================================================
   COUPLE PHOTO
   ========================================================= */

/*
  এখন শুধু একটি couple photo load হবে।
*/

function loadCouplePhotos(){

  if (!coupleGrid) return;

  coupleGrid.innerHTML = "";


  if (
    !COUPLE_PHOTOS ||
    COUPLE_PHOTOS.length === 0
  ){

    coupleGrid.innerHTML =
      `<p style="color:#cfa9bd">
        কোনো couple photo এখনো যোগ করা হয়নি।
      </p>`;

    return;

  }


  /*
    শুধু প্রথম ছবিটা ব্যবহার করা হচ্ছে।
  */

  const src =
    COUPLE_PHOTOS[0];


  const card =
    document.createElement("div");

  card.className =
    "couple-card";


  const image =
    document.createElement("img");

  image.src =
    src;

  image.alt =
    "Our special memory";

  image.loading =
    "lazy";


  card.appendChild(image);

  coupleGrid.appendChild(card);

}


loadCouplePhotos();


/* =========================================================
   GIRL VIDEO SEQUENCE
   ========================================================= */

let currentGirlVideo = 0;


function setupGirlVideos(){

  if (!girlVideo) return;


  if (
    !GIRL_VIDEOS ||
    GIRL_VIDEOS.length === 0
  ){

    if (girlStatus){

      girlStatus.textContent =
        "🎬 কোনো ভিডিও যোগ করা হয়নি";

    }


    if (girlDownload){

      girlDownload.removeAttribute("href");

    }

    return;

  }


  loadGirlVideo(0);

}


function loadGirlVideo(index, autoplay = false){

  if (
    index < 0 ||
    index >= GIRL_VIDEOS.length
  ){

    return;

  }


  currentGirlVideo =
    index;


  const src =
    GIRL_VIDEOS[index];


  girlVideo.src =
    src;

  girlVideo.load();


  if (girlDownload){

    girlDownload.href =
      src;

    girlDownload.download =
      src.split("/").pop();

  }


  if (girlStatus){

    girlStatus.textContent =
      `🎬 Video ${index + 1} / ${GIRL_VIDEOS.length}`;

  }


  if (autoplay){

    const playPromise =
      girlVideo.play();


    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ){

      playPromise.catch(() => {});

    }

  }

}


/*
  When one video ends,
  next video automatically starts.
*/

if (girlVideo){

  girlVideo.addEventListener(
    "ended",
    () => {

      if (
        currentGirlVideo <
        GIRL_VIDEOS.length - 1
      ){

        loadGirlVideo(
          currentGirlVideo + 1,
          true
        );

      } else {

        if (girlStatus){

          girlStatus.textContent =
            "❤️ সব ভিডিও দেখা শেষ";

        }

      }

    }
  );


  girlVideo.addEventListener(
    "play",
    () => {

      if (girlVideoWrap){

        girlVideoWrap.classList.add(
          "playing"
        );

      }


      if (girlStatus){

        girlStatus.textContent =
          `▶️ Playing ${currentGirlVideo + 1} / ${GIRL_VIDEOS.length}`;

      }

    }
  );


  girlVideo.addEventListener(
    "pause",
    () => {

      if (girlVideoWrap){

        girlVideoWrap.classList.remove(
          "playing"
        );

      }

    }
  );

}


setupGirlVideos();


/* =========================================================
   SPECIAL VIDEO
   ========================================================= */

function setupSpecialVideo(){

  if (!specialPlayer) return;


  if (!SPECIAL_VIDEO){

    return;

  }


  specialPlayer.src =
    SPECIAL_VIDEO;

  specialPlayer.load();


  if (specialDownload){

    specialDownload.href =
      SPECIAL_VIDEO;

    specialDownload.download =
      SPECIAL_VIDEO.split("/").pop();

  }

}


setupSpecialVideo();


/* =========================================================
   VIDEO ERROR HANDLING
   ========================================================= */

if (girlVideo){

  girlVideo.addEventListener(
    "error",
    () => {

      if (girlStatus){

        girlStatus.textContent =
          "⚠️ ভিডিওটি পাওয়া যাচ্ছে না। filename/path check করো।";

      }

    }
  );

}


if (specialPlayer){

  specialPlayer.addEventListener(
    "error",
    () => {

      const parent =
        specialPlayer.closest(".special-box");

      const status =
        parent?.querySelector(".video-status");


      if (status){

        status.textContent =
          "⚠️ Special video পাওয়া যাচ্ছে না।";

      }

    }
  );

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

if (backTopButton){

  backTopButton.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top:0,

        behavior:"smooth"

      });

    }
  );

}


/* =========================================================
   PRELOAD IMAGES
   ========================================================= */

function preloadImages(images){

  if (!images) return;


  images.forEach(src => {

    const image =
      new Image();

    image.src =
      src;

  });

}


preloadImages(HER_PHOTOS);

preloadImages(MY_PHOTOS);

preloadImages(COUPLE_PHOTOS);


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

document.addEventListener(
  "error",
  event => {

    const element =
      event.target;


    if (
      element &&
      element.tagName === "IMG"
    ){

      if (
        element.classList.contains(
          "slide-img"
        )
      ){

        element.style.opacity = "0";

      }

    }

  },
  true
);


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    /*
      Original behavior unchanged.
    */

  }
);
