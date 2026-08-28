/* =========================================================
   JUNNU GIFT WEBSITE
   SUPABASE DYNAMIC VERSION
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const MEDIA_BUCKET = "media";

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
   SUPABASE DATA
   ========================================================= */

let SITE_CONTENT = {};

let HER_PHOTOS = [];

let MY_PHOTOS = [];

let COUPLE_PHOTOS = [];

let GIRL_VIDEOS = [];

let SPECIAL_VIDEO = "";

let VOICE_FILE = "";


/* =========================================================
   GET PUBLIC STORAGE URL
   ========================================================= */

function getMediaUrl(folder, filename){

  if(!filename) return "";

  const path =
    `${folder}/${filename}`;

  const {
    data
  } =
  supabaseClient
    .storage
    .from(MEDIA_BUCKET)
    .getPublicUrl(path);

  return data?.publicUrl || "";

}


/* =========================================================
   LOAD WEBSITE CONTENT
   ========================================================= */

async function loadSiteContent(){

  try{

    const {
      data,
      error
    } =
    await supabaseClient
      .from("site_content")
      .select("*");

    if(error){

      console.error(
        "Content loading error:",
        error
      );

      return;

    }


    SITE_CONTENT = {};


    (data || []).forEach(item => {

      if(item.content_key){

        SITE_CONTENT[
          item.content_key
        ] =
          item.content_value || "";

      }

    });


    applySiteContent();


  }catch(error){

    console.error(
      "Site content error:",
      error
    );

  }

}


/* =========================================================
   APPLY TEXT CONTENT
   ========================================================= */

function applySiteContent(){

  /*
    Hero title
  */

  const heroTitle =
    document.querySelector("#open h1");

  if(
    heroTitle &&
    SITE_CONTENT.hero_title
  ){

    heroTitle.textContent =
      SITE_CONTENT.hero_title;

  }


  /*
    Hero subtitle
  */

  const heroSubtitle =
    document.querySelector(
      "#open .sub"
    );

  if(
    heroSubtitle &&
    SITE_CONTENT.hero_subtitle
  ){

    heroSubtitle.textContent =
      SITE_CONTENT.hero_subtitle;

  }


  /*
    Letter title
  */

  const letterTitle =
    document.querySelector(
      ".letter h2"
    );

  if(
    letterTitle &&
    SITE_CONTENT.letter_title
  ){

    letterTitle.textContent =
      SITE_CONTENT.letter_title;

  }


  /*
    Letter text
  */

  const letterText =
    document.querySelector(
      ".letter p"
    );

  if(
    letterText &&
    SITE_CONTENT.letter_text
  ){

    letterText.textContent =
      SITE_CONTENT.letter_text;

  }


  /*
    Special message heading
  */

  const specialHeading =
    document.querySelector(
      "#specialMessage h2"
    );

  if(
    specialHeading &&
    SITE_CONTENT.special_message
  ){

    specialHeading.textContent =
      SITE_CONTENT.special_message;

  }


  /*
    Special message body
  */

  const specialParagraph =
    document.querySelector(
      "#specialMessage p"
    );

  if(
    specialParagraph &&
    SITE_CONTENT.special_message
  ){

    /*
      Keep the existing paragraph
      if special_message is only a short title.
    */

  }


  /*
    Ending section

    We use ending_message
    for the ending paragraph.
  */

  const endingParagraph =
    document.querySelector(
      ".ending p"
    );

  if(
    endingParagraph &&
    SITE_CONTENT.ending_message
  ){

    endingParagraph.textContent =
      SITE_CONTENT.ending_message;

  }

}


/* =========================================================
   LOAD STORAGE MEDIA
   ========================================================= */

async function loadStorageMedia(){

  try{

    /*
      HER PHOTOS
    */

    HER_PHOTOS =
      await listFolderFiles("images");


    /*
      HER VIDEOS
    */

    GIRL_VIDEOS =
      await listFolderFiles("videos");


    /*
      VOICE
    */

    const voiceFiles =
      await listFolderFiles("voice");


    if(voiceFiles.length > 0){

      VOICE_FILE =
        voiceFiles[0];

    }


    /*
      COUPLE PHOTO
    */

    COUPLE_PHOTOS =
      await listFolderFiles("couple");


    /*
      MY PHOTOS

      Current admin system does not have
      a separate my-photos folder.

      If later you create media/my/
      this will automatically work.
    */

    MY_PHOTOS =
      await listFolderFiles("my");


    /*
      Special video

      We check for a filename containing
      "special".
    */

    const specialCandidate =
      GIRL_VIDEOS.find(
        file =>
          file.toLowerCase().includes("special")
      );


    if(specialCandidate){

      SPECIAL_VIDEO =
        getMediaUrl(
          "videos",
          specialCandidate
        );

    }


  }catch(error){

    console.error(
      "Storage media error:",
      error
    );

  }

}


/* =========================================================
   LIST STORAGE FOLDER
   ========================================================= */

async function listFolderFiles(folder){

  try{

    const {
      data,
      error
    } =
    await supabaseClient
      .storage
      .from(MEDIA_BUCKET)
      .list(
        folder,
        {
          limit:100,
          offset:0,
          sortBy:{
            column:"created_at",
            order:"asc"
          }
        }
      );


    if(error){

      console.warn(
        `Could not load ${folder}:`,
        error
      );

      return [];

    }


    if(!data){

      return [];

    }


    return data
      .filter(file => {

        return (
          file &&
          file.name &&
          !file.name.endsWith("/")
        );

      })
      .map(file => file.name);


  }catch(error){

    console.error(
      `Folder ${folder} error:`,
      error
    );

    return [];

  }

}


/* =========================================================
   LETTER TYPING TEXT
   ========================================================= */

const DEFAULT_LETTER_TYPING_TEXT =
  "তুমি আমার জীবনের এমন একজন মানুষ, যাকে ভুলে যাওয়া আমার কাছে নিজের একটা অংশকে ভুলে যাওয়ার মতো। তোমাকে পেয়ে আমি সত্যিই কৃতজ্ঞ।";


/* =========================================================
   OPEN GIFT
   ========================================================= */

let giftOpened = false;

if(goButton){

  goButton.addEventListener(
    "click",
    () => {

      if(giftOpened) return;

      giftOpened = true;

      openScreen.style.display =
        "none";

      exp.classList.add("show");

      startTyping();

      createBackgroundEffects();


      setTimeout(() => {

        surprise?.classList.add(
          "show"
        );

      },2200);


      setTimeout(() => {

        document
          .querySelector("#exp section")
          ?.scrollIntoView({
            behavior:"smooth",
            block:"start"
          });

      },300);

    }
  );

}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

function startTyping(){

  if(!typingElement) return;

  typingElement.textContent = "";

  const text =
    SITE_CONTENT.letter_text ||
    DEFAULT_LETTER_TYPING_TEXT;

  let index = 0;

  const speed = 32;


  function type(){

    if(index >= text.length){

      return;

    }


    typingElement.textContent +=
      text[index];

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

if(envelope){

  envelope.addEventListener(
    "click",
    () => {

      if(envelopeOpened) return;

      envelopeOpened = true;

      envelope.classList.add(
        "open"
      );


      if(envelopeHint){

        envelopeHint.textContent =
          "💗 তোমার জন্য একটা ছোট্ট চিঠি...";

      }


      setTimeout(() => {

        surprise?.classList.add(
          "show"
        );

      },1200);

    }
  );

}


/* =========================================================
   SURPRISE
   ========================================================= */

let surpriseOpened = false;

if(surpriseButton){

  surpriseButton.addEventListener(
    "click",
    () => {

      if(surpriseOpened) return;

      surpriseOpened = true;

      surpriseText?.classList.add(
        "show"
      );


      setTimeout(() => {

        specialMessage?.classList.add(
          "show"
        );

      },700);


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
   BACKGROUND EFFECTS
   ========================================================= */

function createBackgroundEffects(){

  for(let i=0;i<32;i++){

    createSpark();

  }


  setInterval(() => {

    createParticle();

  },850);

}


function createSpark(){

  if(!background) return;

  const spark =
    document.createElement("div");

  spark.className =
    "spark";


  spark.style.left =
    Math.random()*100 + "%";


  spark.style.top =
    Math.random()*100 + "%";


  spark.style.animationDelay =
    Math.random()*2 + "s";


  background.appendChild(
    spark
  );

}


function createParticle(){

  if(!background) return;

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
    Math.random()*100 + "%";


  particle.style.top =
    65 +
    Math.random()*35 +
    "%";


  particle.style.fontSize =
    (12 + Math.random()*20) +
    "px";


  particle.style.color =
    Math.random() > .5
      ? "#ffabc9"
      : "#d8b5ff";


  const duration =
    5 + Math.random()*5;


  particle.style.animationDuration =
    duration + "s";


  background.appendChild(
    particle
  );


  setTimeout(() => {

    particle.remove();

  },duration*1000+500);

}


/* =========================================================
   HEART BURST
   ========================================================= */

function createHeartBurst(
  amount = 15
){

  for(
    let i=0;
    i<amount;
    i++
  ){

    const heart =
      document.createElement(
        "div"
      );


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
      (14+Math.random()*18) +
      "px";


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
      Math.random()*180;


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
          opacity:1
        },

        {
          transform:
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`,
          opacity:0
        }

      ],

      {
        duration:
          900 +
          Math.random()*700,

        easing:
          "cubic-bezier(.22,.61,.36,1)",

        fill:"forwards"
      }

    );


    setTimeout(() => {

      heart.remove();

    },1800);

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

  if(!imageElement || !dotsElement){

    return;

  }


  if(!images || images.length === 0){

    imageElement.removeAttribute(
      "src"
    );


    if(countElement){

      countElement.textContent =
        "No photos";

    }

    return;

  }


  let current = 0;


  dotsElement.innerHTML =
    "";


  images.forEach(
    (_,index) => {

      const dot =
        document.createElement(
          "span"
        );


      dot.className =
        "dot";


      if(index === 0){

        dot.classList.add(
          "active"
        );

      }


      dot.addEventListener(
        "click",
        () => {

          current =
            index;

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


  function showSlide(){

    imageElement.classList.remove(
      "active"
    );


    setTimeout(() => {

      imageElement.src =
        images[current];

      imageElement.classList.add(
        "active"
      );

    },80);


    dots.forEach(
      (dot,index) => {

        dot.classList.toggle(
          "active",
          index === current
        );

      }
    );


    if(countElement){

      countElement.textContent =
        `${current+1} / ${images.length}`;

    }

  }


  imageElement.src =
    images[0];


  imageElement.classList.add(
    "active"
  );


  if(countElement){

    countElement.textContent =
      `1 / ${images.length}`;

  }


  if(images.length > 1){

    setInterval(() => {

      current =
        (current+1) %
        images.length;

      showSlide();

    },interval);

  }

}


/* =========================================================
   HER PHOTO SLIDESHOW
   ========================================================= */

function setupHerPhotos(){

  const images =
    HER_PHOTOS.map(
      file =>
        getMediaUrl(
          "images",
          file
        )
    );


  createSlideshow({

    imageElement:
      document.getElementById(
        "herImg"
      ),

    dotsElement:
      document.getElementById(
        "herDots"
      ),

    countElement:
      document.getElementById(
        "herCount"
      ),

    images:images,

    interval:4500

  });

}


/* =========================================================
   MY PHOTO SLIDESHOW
   ========================================================= */

function setupMyPhotos(){

  const images =
    MY_PHOTOS.map(
      file =>
        getMediaUrl(
          "my",
          file
        )
    );


  createSlideshow({

    imageElement:
      document.getElementById(
        "myImg"
      ),

    dotsElement:
      document.getElementById(
        "myDots"
      ),

    countElement:
      document.getElementById(
        "myCount"
      ),

    images:images,

    interval:4500

  });

}


/* =========================================================
   COUPLE PHOTO
   ========================================================= */

function loadCouplePhotos(){

  if(!coupleGrid) return;

  coupleGrid.innerHTML =
    "";


  if(
    !COUPLE_PHOTOS ||
    COUPLE_PHOTOS.length === 0
  ){

    coupleGrid.innerHTML =
      `<p style="color:#cfa9bd">
        কোনো couple photo এখনো যোগ করা হয়নি।
      </p>`;

    return;

  }


  const src =
    getMediaUrl(
      "couple",
      COUPLE_PHOTOS[0]
    );


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
    src;


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
   GIRL VIDEO SEQUENCE
   ========================================================= */

let currentGirlVideo = 0;


function setupGirlVideos(){

  if(!girlVideo) return;


  if(
    !GIRL_VIDEOS ||
    GIRL_VIDEOS.length === 0
  ){

    if(girlStatus){

      girlStatus.textContent =
        "🎬 কোনো ভিডিও যোগ করা হয়নি";

    }


    if(girlDownload){

      girlDownload.removeAttribute(
        "href"
      );

    }

    return;

  }


  loadGirlVideo(
    0
  );

}


function loadGirlVideo(
  index,
  autoplay = false
){

  if(
    index < 0 ||
    index >= GIRL_VIDEOS.length
  ){

    return;

  }


  currentGirlVideo =
    index;


  const src =
    getMediaUrl(
      "videos",
      GIRL_VIDEOS[index]
    );


  girlVideo.src =
    src;


  girlVideo.load();


  if(girlDownload){

    girlDownload.href =
      src;


    girlDownload.download =
      GIRL_VIDEOS[index];

  }


  if(girlStatus){

    girlStatus.textContent =
      `🎬 Video ${index+1} / ${GIRL_VIDEOS.length}`;

  }


  if(autoplay){

    const playPromise =
      girlVideo.play();


    if(
      playPromise &&
      typeof playPromise.catch ===
      "function"
    ){

      playPromise.catch(
        () => {}
      );

    }

  }

}


/* =========================================================
   VIDEO EVENTS
   ========================================================= */

if(girlVideo){

  girlVideo.addEventListener(
    "ended",
    () => {

      if(
        currentGirlVideo <
        GIRL_VIDEOS.length-1
      ){

        loadGirlVideo(
          currentGirlVideo+1,
          true
        );

      }else{

        if(girlStatus){

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


      if(girlStatus){

        girlStatus.textContent =
          `▶️ Playing ${currentGirlVideo+1} / ${GIRL_VIDEOS.length}`;

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

      if(girlStatus){

        girlStatus.textContent =
          "⚠️ ভিডিওটি পাওয়া যাচ্ছে না।";

      }

    }
  );

}


/* =====================
