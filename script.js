/* =========================================================
   JUNNU GIFT — MAIN WEBSITE
   Supabase Storage Edition
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const MEDIA_BUCKET = "media";


/* =========================================================
   DOM
   ========================================================= */

const openScreen = document.getElementById("open");
const exp = document.getElementById("exp");
const goButton = document.getElementById("go");

const typingElement = document.getElementById("typing");
const envelope = document.getElementById("env");
const envelopeHint = document.getElementById("eh");

const surprise = document.getElementById("surprise");
const surpriseButton = document.getElementById("rb");
const surpriseText = document.getElementById("u");
const specialMessage = document.getElementById("specialMessage");

const background = document.getElementById("bg");

const girlVideo = document.getElementById("girlVideo");
const girlVideoWrap = document.getElementById("girlVideoWrap");
const girlStatus = document.getElementById("girlStatus");
const girlDownload = document.getElementById("girlDownload");

const specialPlayer = document.getElementById("specialPlayer");
const specialDownload = document.getElementById("specialDownload");

const coupleGrid = document.getElementById("coupleGrid");
const backTopButton = document.getElementById("backTopBtn");


/* =========================================================
   SUPABASE DATA
   ========================================================= */

let HER_PHOTOS = [];
let MY_PHOTOS = [];
let COUPLE_PHOTOS = [];

let GIRL_VIDEOS = [];
let SPECIAL_VIDEO = "";

let VOICE_FILES = [];

let currentGirlVideo = 0;


/* =========================================================
   PARTICLES
   ========================================================= */

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
   LETTER
   ========================================================= */

const LETTER_TYPING_TEXT =
  "তুমি আমার জীবনের এমন একজন মানুষ, যাকে ভুলে যাওয়া আমার কাছে নিজের একটা অংশকে ভুলে যাওয়ার মতো। তোমাকে পেয়ে আমি সত্যিই কৃতজ্ঞ।";


/* =========================================================
   SUPABASE STORAGE HELPERS
   ========================================================= */

function getPublicUrl(path) {

  if (!supabaseClient) {
    console.error("Supabase client পাওয়া যায়নি।");
    return "";
  }

  const { data } =
    supabaseClient
      .storage
      .from(MEDIA_BUCKET)
      .getPublicUrl(path);

  return data?.publicUrl || "";
}


/* =========================================================
   LOAD FILES FROM SUPABASE
   ========================================================= */

async function getStorageFiles(folder) {

  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .storage
        .from(MEDIA_BUCKET)
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: {
            column: "created_at",
            order: "asc"
          }
        });

    if (error) {

      console.error(
        `Supabase ${folder} error:`,
        error
      );

      return [];

    }

    if (!data) return [];

    return data
      .filter(file => file.name)
      .map(file => {

        const path =
          `${folder}/${file.name}`;

        return {
          name: file.name,
          path: path,
          url: getPublicUrl(path)
        };

      });

  } catch (error) {

    console.error(
      `Could not load ${folder}:`,
      error
    );

    return [];

  }

}


/* =========================================================
   LOAD ALL MEDIA
   ========================================================= */

async function loadAllMedia() {

  console.log("🔄 Loading media from Supabase...");


  const [
    images,
    videos,
    voice,
    couple
  ] =
    await Promise.all([
      getStorageFiles("images"),
      getStorageFiles("videos"),
      getStorageFiles("voice"),
      getStorageFiles("couple")
    ]);


  /*
    সব uploaded image
  */

  const imageUrls =
    images.map(file => file.url);


  /*
    এখন images folder-এর প্রথমগুলো
    Her Photos হিসেবে ব্যবহার হবে।

    চাইলে filename দিয়ে আলাদা করা যাবে।
  */

  HER_PHOTOS = imageUrls;


  /*
    আপাতত একই images folder-এর ছবি
    My Photos-এর জন্য আলাদা করে ব্যবহার
    করা হচ্ছে না।
  */

  MY_PHOTOS = [];


  /*
    Couple folder
  */

  COUPLE_PHOTOS =
    couple.map(file => file.url);


  /*
    Videos
  */

  GIRL_VIDEOS =
    videos.map(file => file.url);


  /*
    Voice
  */

  VOICE_FILES = voice;


  /*
    Special video:
    যদি videos folder-এ "special" নামের
    video থাকে, সেটা special video হবে।
  */

  const specialFile =
    videos.find(file =>
      file.name
        .toLowerCase()
        .startsWith("special.")
    );


  if (specialFile) {

    SPECIAL_VIDEO =
      specialFile.url;

  } else {

    SPECIAL_VIDEO = "";

  }


  console.log(
    "✅ Supabase media loaded:",
    {
      images: HER_PHOTOS.length,
      videos: GIRL_VIDEOS.length,
      voice: VOICE_FILES.length,
      couple: COUPLE_PHOTOS.length
    }
  );


  /*
    এখন sections initialize করব।
  */

  setupMediaSections();

}


/* =========================================================
   SETUP MEDIA SECTIONS
   ========================================================= */

function setupMediaSections() {


  /* -------------------------
     HER PHOTOS
     ------------------------- */

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


  /* -------------------------
     MY PHOTOS
     ------------------------- */

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


  /* -------------------------
     COUPLE
     ------------------------- */

  loadCouplePhotos();


  /* -------------------------
     GIRL VIDEOS
     ------------------------- */

  setupGirlVideos();


  /* -------------------------
     SPECIAL VIDEO
     ------------------------- */

  setupSpecialVideo();


  /* -------------------------
     VOICE
     ------------------------- */

  setupVoice();

}


/* =========================================================
   OPEN GIFT
   ========================================================= */

let giftOpened = false;


if (goButton) {

  goButton.addEventListener(
    "click",
    () => {

      if (giftOpened) return;

      giftOpened = true;

      if (openScreen) {

        openScreen.style.display =
          "none";

      }

      if (exp) {

        exp.classList.add("show");

      }

      startTyping();

      createBackgroundEffects();


      setTimeout(() => {

        if (surprise) {

          surprise.classList.add("show");

        }

      }, 2200);


      setTimeout(() => {

        document
          .querySelector("#exp section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      }, 300);

    }
  );

}


/* =========================================================
   TYPING
   ========================================================= */

function startTyping() {

  if (!typingElement) return;

  typingElement.textContent = "";

  let index = 0;

  const speed = 32;


  function type() {

    if (
      index >=
      LETTER_TYPING_TEXT.length
    ) {

      return;

    }

    typingElement.textContent +=
      LETTER_TYPING_TEXT[index];

    index++;

    setTimeout(
      type,
      speed
    );

  }


  type();

}


/* =========================================================
   ENVELOPE
   ========================================================= */

let envelopeOpened = false;


if (envelope) {

  envelope.addEventListener(
    "click",
    () => {

      if (envelopeOpened) return;

      envelopeOpened = true;

      envelope.classList.add("open");


      if (envelopeHint) {

        envelopeHint.textContent =
          "💗 তোমার জন্য একটা ছোট্ট চিঠি...";

      }


      setTimeout(() => {

        surprise?.classList.add("show");

      }, 1200);

    }
  );

}


/* =========================================================
   SURPRISE
   ========================================================= */

let surpriseOpened = false;


if (surpriseButton) {

  surpriseButton.addEventListener(
    "click",
    () => {

      if (surpriseOpened) return;

      surpriseOpened = true;

      surpriseText?.classList.add("show");


      setTimeout(() => {

        specialMessage?.classList.add("show");

      }, 700);


      createHeartBurst(18);

    }
  );

}


/* =========================================================
   CAPTION CARDS
   ========================================================= */

const captionCards =
  document.querySelectorAll(
    ".caption-card"
  );


captionCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      card.classList.toggle(
        "open"
      );

    }
  );

});


/* =========================================================
   BACKGROUND
   ========================================================= */

function createBackgroundEffects() {

  for (
    let i = 0;
    i < 32;
    i++
  ) {

    createSpark();

  }


  setInterval(() => {

    createParticle();

  }, 850);

}


function createSpark() {

  if (!background) return;

  const spark =
    document.createElement("div");

  spark.className =
    "spark";


  spark.style.left =
    Math.random() * 100 + "%";

  spark.style.top =
    Math.random() * 100 + "%";

  spark.style.animationDelay =
    Math.random() * 2 + "s";


  background.appendChild(
    spark
  );

}


function createParticle() {

  if (!background) return;

  const particle =
    document.createElement("div");

  particle.className =
    "particle";


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
    65 +
    Math.random() * 35 +
    "%";


  particle.style.fontSize =
    (
      12 +
      Math.random() * 20
    ) + "px";


  particle.style.color =
    Math.random() > .5
      ? "#ffabc9"
      : "#d8b5ff";


  const duration =
    5 +
    Math.random() * 5;


  particle.style.animationDuration =
    duration + "s";


  background.appendChild(
    particle
  );


  setTimeout(() => {

    particle.remove();

  }, duration * 1000 + 500);

}


/* =========================================================
   HEART BURST
   ========================================================= */

function createHeartBurst(
  amount = 15
) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

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
      (
        14 +
        Math.random() * 18
      ) + "px";


    heart.style.textShadow =
      "0 0 15px #ff4e91";


    document.body.appendChild(
      heart
    );


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      80 +
      Math.random() * 180;


    const x =
      Math.cos(angle) *
      distance;


    const y =
      Math.sin(angle) *
      distance;


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
          900 +
          Math.random() * 700,

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
   SLIDESHOW
   ========================================================= */

function createSlideshow({
  imageElement,
  dotsElement,
  countElement,
  images,
  interval = 4200
}) {

  if (
    !imageElement ||
    !dotsElement
  ) {

    return;

  }


  if (
    !images ||
    images.length === 0
  ) {

    imageElement.removeAttribute(
      "src"
    );


    if (countElement) {

      countElement.textContent =
        "No photos uploaded yet";

    }


    dotsElement.innerHTML = "";

    return;

  }


  let current = 0;


  dotsElement.innerHTML = "";


  images.forEach(
    (_, index) => {

      const dot =
        document.createElement(
          "span"
        );


      dot.className =
        "dot";


      if (index === 0) {

        dot.classList.add(
          "active"
        );

      }


      dot.addEventListener(
        "click",
        () => {

          current = index;

          showSlide();

        }
      );


      dotsElement.appendChild(
        dot
      );

    }
  );


  const dots =
    dotsElement.querySelectorAll(
      ".dot"
    );


  function showSlide() {

    imageElement.classList.remove(
      "active"
    );


    setTimeout(() => {

      imageElement.src =
        images[current];

      imageElement.classList.add(
        "active"
      );

    }, 80);


    dots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === current
        );

      }
    );


    if (countElement) {

      countElement.textContent =
        `${current + 1} / ${images.length}`;

    }

  }


  imageElement.src =
    images[0];


  imageElement.classList.add(
    "active"
  );


  if (countElement) {

    countElement.textContent =
      `1 / ${images.length}`;

  }


  if (images.length > 1) {

    setInterval(() => {

      current =
        (
          current + 1
        ) %
        images.length;

      showSlide();

    }, interval);

  }

}


/* =========================================================
   COUPLE PHOTO
   ========================================================= */

function loadCouplePhotos() {

  if (!coupleGrid) return;


  coupleGrid.innerHTML = "";


  if (
    !COUPLE_PHOTOS ||
    COUPLE_PHOTOS.length === 0
  ) {

    coupleGrid.innerHTML =
      `
      <p style="color:#cfa9bd">
        কোনো couple photo এখনো যোগ করা হয়নি।
      </p>
      `;

    return;

  }


  const card =
    document.createElement(
      "div"
    );


  card.className =
    "couple-card";


  const image =
    document.createElement(
      "img"
    );


  image.src =
    COUPLE_PHOTOS[0];


  image.alt =
    "Our special memory";


  image.loading =
    "lazy";


  card.appendChild(
    image
  );


  coupleGrid.appendChild(
    card
  );

}


/* =========================================================
   GIRL VIDEOS
   ========================================================= */

function setupGirlVideos() {

  if (!girlVideo) return;


  if (
    !GIRL_VIDEOS ||
    GIRL_VIDEOS.length === 0
  ) {

    if (girlStatus) {

      girlStatus.textContent =
        "🎬 এখনো কোনো ভিডিও upload করা হয়নি।";

    }


    return;

  }


  loadGirlVideo(
    0,
    false
  );

}


function loadGirlVideo(
  index,
  autoplay = false
) {

  if (
    index < 0 ||
    index >= GIRL_VIDEOS.length
  ) {

    return;

  }


  currentGirlVideo =
    index;


  const src =
    GIRL_VIDEOS[index];


  girlVideo.src =
    src;


  girlVideo.load();


  if (girlDownload) {

    girlDownload.href =
      src;

    girlDownload.download =
      getFileName(src);

  }


  if (girlStatus) {

    girlStatus.textContent =
      `🎬 Video ${index + 1} / ${GIRL_VIDEOS.length}`;

  }


  if (autoplay) {

    const playPromise =
      girlVideo.play();


    if (
      playPromise &&
      typeof playPromise.catch ===
        "function"
    ) {

      playPromise.catch(
        () => {}
      );

    }

  }

}


/* =========================================================
   GIRL VIDEO EVENTS
   ========================================================= */

if (girlVideo) {

  girlVideo.addEventListener(
    "ended",
    () => {

      if (
        currentGirlVideo <
        GIRL_VIDEOS.length - 1
      ) {

        loadGirlVideo(
          currentGirlVideo + 1,
          true
        );

      } else {

        if (girlStatus) {

          girlStatus.textContent =
            "❤️ সব ভিডিও দেখা শেষ";

        }

      }

    }
  );


  girlVideo.addEventListener(
    "play",
    () => {

      girlVideoWrap?.classList.add(
        "playing"
      );


      if (girlStatus) {

        girlStatus.textContent =
          `▶️ Playing ${currentGirlVideo + 1} / ${GIRL_VIDEOS.length}`;

      }

    }
  );


  girlVideo.addEventListener(
    "pause",
    () => {

      girlVideoWrap?.classList.remove(
        "playing"
      );

    }
  );


  girlVideo.addEventListener(
    "error",
    () => {

      if (girlStatus) {

        girlStatus.textContent =
          "⚠️ Video load করা যায়নি।";

      }

    }
  );

}


/* =========================================================
   SPECIAL VIDEO
   ========================================================= */

function setupSpecialVideo() {

  if (!specialPlayer) return;


  if (!SPECIAL_VIDEO) {

    specialPlayer.removeAttribute(
      "src"
    );


    const box =
      specialPlayer.closest(
        ".special-box"
      );


    const status =
      box?.querySelector(
        ".video-status"
      );


    if (status) {

      status.textContent =
        "❤️ Special video এখনো upload করা হয়নি।";

    }


    return;

  }


  specialPlayer.src =
    SPECIAL_VIDEO;


  specialPlayer.load();


  if (specialDownload) {

    specialDownload.href =
      SPECIAL_VIDEO;

    specialDownload.download =
      getFileName(
        SPECIAL_VIDEO
      );

  }

}


/* =========================================================
   SPECIAL VIDEO ERROR
   ========================================================= */

if (specialPlayer) {

  specialPlayer.addEventListener(
    "error",
    () => {

      const parent =
        specialPlayer.closest(
          ".special-box"
        );


      const status =
        parent?.querySelector(
          ".video-status"
        );


      if (status) {

        status.textContent =
          "⚠️ Special video পাওয়া যাচ্ছে না।";

      }

    }
  );

}


/* =========================================================
   VOICE MESSAGE
   ========================================================= */

function setupVoice() {

  const voiceBox =
    document.querySelector(
      ".voice-box"
    );


  if (!voiceBox) return;


  /*
    আগের placeholder text সরিয়ে
    Supabase audio player বসানো হবে।
  */

  const oldAudio =
    voiceBox.querySelector(
      ".supabase-voice-player"
    );


  if (oldAudio) {

    oldAudio.remove();

  }


  if (
    !VOICE_FILES ||
    VOICE_FILES.length === 0
  ) {

    return;

  }


  const voiceContainer =
    document.createElement(
      "div"
    );


  voiceContainer.className =
    "supabase-voice-player";


  voiceContainer.style.cssText = `
    width:100%;
    margin-top:20px;
    padding:15px;
    border-radius:18px;
    background:rgba(255,255,255,.06);
    border:1px solid r
