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
    "
