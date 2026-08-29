/* =========================================================
   JUNNU GIFT — LOCAL ASSETS VERSION
   No Supabase
   No Database
   No Admin
   No Videos
   No Voice
   ========================================================= */


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
const specialMessage =
  document.getElementById("specialMessage");

const background =
  document.getElementById("bg");

const coupleGrid =
  document.getElementById("coupleGrid");

const backTopButton =
  document.getElementById("backTopBtn");


/* =========================================================
   IMAGE PATH
   ========================================================= */

const IMAGE_PATH = "assets/images/";


/* =========================================================
   HER PHOTOS
   ========================================================= */

const HER_PHOTOS = [
  "her (1).jpg",
  "her (2).jpg",
  "her (3).jpg",
  "her (4).jpg",
  "her (5).jpg",
  "her (6).jpg",
  "her (7).jpg",
  "her (8).jpg",
  "her (9).jpg",
  "her (10).jpg",
  "her (11).jpg",
  "her (12).jpg",
  "her (13).jpg",
  "her (14).jpg",
  "her (15).jpg",
  "her (16).jpg",
  "her (17).jpg"
].map(
  file => IMAGE_PATH + file
);


/* =========================================================
   MY PHOTOS
   ========================================================= */

const MY_PHOTOS = [
  "my (1).jpg",
  "my (2).jpg",
  "my (3).jpg",
  "my (4).jpg",
  "my (5).jpg",
  "my (6).jpg",
  "my (7).jpg",
  "my (8).jpg",
  "my (9).jpg",
  "my (10).jpg",
  "my (11).jpg",
  "my (12).jpg",
  "my (13).jpg",
  "my (14).jpg",
  "my (15).jpg",
  "my (16).png"
].map(
  file => IMAGE_PATH + file
);


/* =========================================================
   COUPLE PHOTO
   ========================================================= */

const COUPLE_PHOTOS = [
  IMAGE_PATH + "couple (1).jpg"
];


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
   LETTER TEXT
   ========================================================= */

const LETTER_TYPING_TEXT =
  "তুমি আমার জীবনের এমন একজন মানুষ, যাকে ভুলে যাওয়া আমার কাছে নিজের একটা অংশকে ভুলে যাওয়ার মতো। তোমাকে পেয়ে আমি সত্যিই কৃতজ্ঞ।";


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

        openScreen.style.display = "none";

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

      card.classList.toggle("open");

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

  spark.className = "spark";


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
    Math.random() > 0.5
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
      Math.random() > 0.5
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
  interval = 4500
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
        "No photos";

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


      dot.className = "dot";


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
        কোনো couple photo পাওয়া যায়নি।
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
   INITIALIZE SLIDESHOWS
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


loadCouplePhotos();


/* =========================================================
   BACK TO TOP
   ========================================================= */

if (backTopButton) {

  backTopButton.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}
