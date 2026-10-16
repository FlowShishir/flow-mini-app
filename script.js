/* JUNNU GIFT — cinematic local-assets edition
   Keeps the existing local image filenames unchanged. */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const openScreen = $('#open');
const experience = $('#exp');
const goButton = $('#go');
const typingElement = $('#typing');
const envelope = $('#env');
const envelopeHint = $('#eh');
const surprise = $('#surprise');
const surpriseButton = $('#rb');
const surpriseText = $('#u');
const specialMessage = $('#specialMessage');
const background = $('#bg');
const coupleGrid = $('#coupleGrid');
const toast = $('#toast');

const IMAGE_PATH = 'assets/images/';
// Do not rename these files: keep the original filenames exactly as supplied.
const HER_PHOTOS = [
  'her (1).jpg','her (2).jpg','her (3).jpg','her (4).jpg','her (5).jpg',
  'her (6).jpg','her (7).jpg','her (8).jpg','her (9).jpg','her (10).jpg',
  'her (11).jpg','her (12).jpg','her (13).jpg','her (14).jpg','her (15).jpg',
  'her (16).jpg','her (17).jpg'
].map(file => IMAGE_PATH + file);
const MY_PHOTOS = [
  'my (1).jpg','my (2).jpg','my (3).jpg','my (4).jpg','my (5).jpg',
  'my (6).jpg','my (7).jpg','my (8).jpg','my (9).jpg','my (10).jpg',
  'my (11).jpg','my (12).jpg','my (13).jpg','my (14).jpg','my (15).jpg',
  'my (16).png'
].map(file => IMAGE_PATH + file);
const COUPLE_PHOTOS = [IMAGE_PATH + 'couple (1).jpg'];

const PARTICLE_SYMBOLS = ['♡','♥','✦','✧','⋆','❤','🌸','•'];
const LETTER_TYPING_TEXT = 'তুমি আমার জীবনের এমন একজন মানুষ, যাকে ভুলে যাওয়া আমার কাছে নিজের একটা অংশকে ভুলে যাওয়ার মতো। তোমাকে পেয়ে আমি সত্যিই কৃতজ্ঞ।';

const MEMORY_NOTES = [
  'তোমার একটা ছোট্ট হাসিও আমার পুরো দিনটা সুন্দর করে দিতে পারে। 🌸',
  'দূরে থেকেও কিছু মানুষ মনের খুব কাছে থাকে—তুমি তেমনই একজন। ❤️',
  'তোমার কথা মনে পড়লে অজান্তেই মুখে একটু হাসি চলে আসে।',
  'সব অনুভূতি কথায় বোঝানো যায় না; কিছু অনুভূতি শুধু মনে থেকে যায়।',
  'তুমি ভালো থেকো—দূর থেকে চাওয়া আমার সবচেয়ে নীরব ইচ্ছেগুলোর একটি। 🌙',
  'কিছু স্মৃতি সময় পেরিয়েও পুরোনো হয় না।',
  'তোমার সঙ্গে কথা বলা ছোট্ট মুহূর্তগুলোও আমার কাছে মূল্যবান।',
  'আজকের দিনটা কঠিন হলেও মনে রেখো, খারাপ সময় সবসময় থাকে না। 🫶',
  'তুমি নিজের মতো করেই সুন্দর—তোমার হাসিটা ধরে রেখো।',
  'কখনো কখনো কাউকে মিস করাও ভালোবাসার নীরব ভাষা হয়ে ওঠে।',
  'তোমার জন্য আমার মনের ছোট্ট জায়গাটুকু সবসময় আলাদা থাকবে।',
  'যে স্মৃতি সত্যি মন ছুঁয়ে যায়, তাকে ভুলে যাওয়া সহজ নয়।',
  'তোমার মন খারাপের দিনে নিজের প্রতি একটু কোমল হয়ো। 🌷',
  'একটা ছোট্ট ভালো খবরও তোমার দিনটাকে বদলে দিতে পারে—সেই আশাটুকু রেখো।',
  'সব ইচ্ছে পূরণ না হলেও, সুন্দর ইচ্ছে দেখতে দোষ নেই। ✨',
  'রাত যত নীরবই হোক, আগামীকাল নতুন করে শুরু করার সুযোগ থাকে।',
  'তোমার জীবনে শান্তি, হাসি আর সুন্দর মানুষ ভরে উঠুক।',
  'এই জারটার শেষ কথাটাও একই: নিজের যত্ন নিও, জুন্নু। ❤️'
];

const WHEN_LETTERS = {
  miss: 'যদি আমাকে মিস করো, একটু থেমে নিঃশ্বাস নাও। আমাদের ভালো মুহূর্তগুলো মনে করতে পারো, তবে নিজের বর্তমানটাকেও সুন্দর করে বাঁচতে ভুলো না। তোমার হাসিটা খুব মূল্যবান। ❤️',
  sad: 'মন খারাপ থাকলে নিজেকে একা সামলাতে হবে—এমন কোনো নিয়ম নেই। একটু বিশ্রাম নাও, পানি খাও, পছন্দের কিছু করো, আর দরকার হলে বিশ্বাসের কাউকে বলো। এই সময়টাও কেটে যাবে। 🫶',
  smile: 'একটু হাসো তো! 🙂 পৃথিবীর সব দিন একরকম হয় না। তোমার ছোট্ট হাসিটা তোমার নিজের জন্যও রাখো। আর হ্যাঁ—এই ওয়েবসাইটের U lala-টাও কিন্তু তোমাকে হাসানোর চেষ্টা করছে! 🌷',
  night: 'রাত অনেক হলে নিজের মনটাকে একটু বিশ্রাম দিও। সব প্রশ্নের উত্তর আজ রাতেই খুঁজতে হবে না। শান্তিতে ঘুমাও, কাল আবার নতুন একটা সকাল অপেক্ষা করবে। শুভরাত্রি, জুন্নু। 🌙'
};

let giftOpened = false;
let envelopeOpened = false;
let surpriseOpened = false;
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function startTyping() {
  if (!typingElement) return;
  typingElement.textContent = '';
  let index = 0;
  const type = () => {
    if (index >= LETTER_TYPING_TEXT.length) return;
    typingElement.textContent += LETTER_TYPING_TEXT[index++];
    setTimeout(type, 32);
  };
  type();
}

function createSpark() {
  if (!background) return;
  const spark = document.createElement('span');
  spark.className = 'spark';
  spark.style.left = `${Math.random() * 100}%`;
  spark.style.top = `${Math.random() * 100}%`;
  spark.style.animationDelay = `${Math.random() * 2.5}s`;
  spark.style.opacity = `${0.25 + Math.random() * 0.65}`;
  background.appendChild(spark);
}
function createParticle() {
  if (!background || document.hidden) return;
  const particle = document.createElement('span');
  particle.className = 'particle';
  particle.textContent = PARTICLE_SYMBOLS[Math.floor(Math.random() * PARTICLE_SYMBOLS.length)];
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${68 + Math.random() * 32}%`;
  particle.style.fontSize = `${12 + Math.random() * 18}px`;
  particle.style.color = Math.random() > .5 ? '#ffb5d2' : '#c9b4ff';
  const duration = 6 + Math.random() * 5;
  particle.style.animationDuration = `${duration}s`;
  background.appendChild(particle);
  setTimeout(() => particle.remove(), duration * 1000 + 500);
}
function createBackgroundEffects() {
  if (!background || background.dataset.ready) return;
  background.dataset.ready = 'true';
  for (let i = 0; i < 42; i++) createSpark();
  setInterval(createParticle, 950);
}
function createHeartBurst(amount = 18) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('span');
    heart.textContent = Math.random() > .5 ? '♥' : '♡';
    Object.assign(heart.style, {
      position: 'fixed', left: '50%', top: '50%', zIndex: '9999',
      pointerEvents: 'none', color: Math.random() > .5 ? '#ffb5d2' : '#c9b4ff',
      fontSize: `${14 + Math.random() * 18}px`, textShadow: '0 0 15px #ff6fae'
    });
    document.body.appendChild(heart);
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 180;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    heart.animate([
      { transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 },
      { transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(1.2)`, opacity: 0 }
    ], { duration: 900 + Math.random() * 700, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' });
    setTimeout(() => heart.remove(), 1800);
  }
}
function showerPetals(amount = 22) {
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = Math.random() > .45 ? '🌸' : '✿';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${12 + Math.random() * 16}px`;
    petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    petal.style.animationDuration = `${4 + Math.random() * 4}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 8500);
  }
}

if (goButton) goButton.addEventListener('click', () => {
  if (giftOpened) return;
  giftOpened = true;
  if (openScreen) openScreen.style.display = 'none';
  if (experience) experience.classList.add('show');
  startTyping();
  createBackgroundEffects();
  setTimeout(() => surprise?.classList.add('show'), 1800);
  setTimeout(() => $('#beginning')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
  showerPetals(12);
});

if (envelope) envelope.addEventListener('click', () => {
  if (envelopeOpened) {
    $('#letterCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  envelopeOpened = true;
  envelope.classList.add('open');
  if (envelopeHint) envelopeHint.textContent = '💗 তোমার জন্য একটা ছোট্ট চিঠি খুলে গেছে';
  createHeartBurst(10);
  setTimeout(() => surprise?.classList.add('show'), 600);
});

if (surpriseButton) surpriseButton.addEventListener('click', () => {
  if (surpriseOpened) {
    showToast('এই ছোট্ট সারপ্রাইজটা আবারও তোমার জন্য ❤️');
    createHeartBurst(8);
    return;
  }
  surpriseOpened = true;
  surpriseText?.classList.add('show');
  setTimeout(() => specialMessage?.classList.add('show'), 450);
  createHeartBurst(22);
  showerPetals(16);
});

$$('.caption-card').forEach(card => card.addEventListener('click', () => {
  const wasOpen = card.classList.contains('open');
  card.classList.toggle('open', !wasOpen);
  card.setAttribute('aria-expanded', String(!wasOpen));
}));

/* Memory jar: every note is shown once before the jar resets. */
let remainingNotes = [];
function resetNotes() { remainingNotes = [...MEMORY_NOTES.keys()]; }
resetNotes();
$('#drawNote')?.addEventListener('click', () => {
  if (!remainingNotes.length) resetNotes();
  const pickIndex = Math.floor(Math.random() * remainingNotes.length);
  const noteIndex = remainingNotes.splice(pickIndex, 1)[0];
  const note = $('#jarNote');
  if (note) {
    note.animate?.([{ opacity: .25, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350 });
    note.textContent = MEMORY_NOTES[noteIndex];
  }
  const count = $('#jarCount');
  if (count) count.textContent = remainingNotes.length ? `${remainingNotes.length}টি নতুন কথা এখনো বাকি` : 'সব ১৮টি কথা দেখা হয়েছে—আবার নতুন করে শুরু হলো';
  createHeartBurst(5);
});

$$('.when-card').forEach(card => card.addEventListener('click', () => {
  $$('.when-card').forEach(other => other.classList.toggle('active', other === card));
  const key = card.dataset.when;
  const target = $('#whenLetter');
  if (target && WHEN_LETTERS[key]) target.innerHTML = `<span class="letter-spark">✧</span><p>${WHEN_LETTERS[key]}</p>`;
}));

function createSlideshow({ imageElement, dotsElement, countElement, images, interval = 4500, prevButton, nextButton }) {
  if (!imageElement || !dotsElement) return;
  let current = 0;
  let timer = null;
  dotsElement.innerHTML = '';
  const dots = images.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `dot${index === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `ছবি ${index + 1}`);
    dot.addEventListener('click', () => { current = index; showSlide(); restartTimer(); });
    dotsElement.appendChild(dot);
    return dot;
  });
  function showSlide() {
    imageElement.classList.remove('active');
    const nextSrc = images[current];
    setTimeout(() => {
      imageElement.src = nextSrc;
      imageElement.classList.add('active');
    }, 90);
    dots.forEach((dot, index) => dot.classList.toggle('active', index === current));
    if (countElement) countElement.textContent = `${current + 1} / ${images.length}`;
  }
  function step(direction) { current = (current + direction + images.length) % images.length; showSlide(); restartTimer(); }
  function restartTimer() {
    clearInterval(timer);
    if (images.length > 1) timer = setInterval(() => { current = (current + 1) % images.length; showSlide(); }, interval);
  }
  prevButton?.addEventListener('click', () => step(-1));
  nextButton?.addEventListener('click', () => step(1));
  imageElement.src = images[0];
  imageElement.classList.add('active');
  if (countElement) countElement.textContent = `1 / ${images.length}`;
  restartTimer();
  // Pause the slideshow while the page is hidden to reduce mobile battery use.
  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : restartTimer());
  imageElement.addEventListener('error', () => {
    imageElement.alt = 'ছবিটি পাওয়া যায়নি — assets/images ফোল্ডারে ফাইলের নাম মিলিয়ে দেখো';
  });
}

createSlideshow({ imageElement: $('#herImg'), dotsElement: $('#herDots'), countElement: $('#herCount'), images: HER_PHOTOS, interval: 4500, prevButton: $('#herPrev'), nextButton: $('#herNext') });
createSlideshow({ imageElement: $('#myImg'), dotsElement: $('#myDots'), countElement: $('#myCount'), images: MY_PHOTOS, interval: 4500, prevButton: $('#myPrev'), nextButton: $('#myNext') });

function loadCouplePhotos() {
  if (!coupleGrid) return;
  coupleGrid.innerHTML = '';
  COUPLE_PHOTOS.forEach((src) => {
    const card = document.createElement('div');
    card.className = 'couple-card';
    const image = document.createElement('img');
    image.src = src;
    image.alt = 'Our special memory';
    image.loading = 'lazy';
    image.onerror = () => { card.innerHTML = '<p>ছবিটি পাওয়া যায়নি। assets/images/couple (1).jpg নামটি ঠিক আছে কি না দেখো।</p>'; };
    card.appendChild(image);
    coupleGrid.appendChild(card);
  });
}
loadCouplePhotos();

$('#wishButton')?.addEventListener('click', () => {
  const wishes = [
    'তোমার আগামী দিনগুলো শান্তি আর সুন্দর মুহূর্তে ভরে উঠুক। ✨',
    'তোমার মুখের হাসিটা যেন অনেক দিন এমনই থাকে। 🌷',
    'তোমার ছোট-বড় সব স্বপ্নের দিকে তুমি সাহস নিয়ে এগিয়ে যাও। 🌙',
    'আজকের রাত তোমার মনে একটু শান্তি আর আশার আলো রেখে যাক। 💗'
  ];
  const result = $('#wishResult');
  if (result) result.textContent = wishes[Math.floor(Math.random() * wishes.length)];
  createHeartBurst(8);
});

$('#petalButton')?.addEventListener('click', () => { showerPetals(24); showToast('তোমার জন্য এক মুঠো ফুলের পাপড়ি 🌸'); });
$('#moon')?.addEventListener('click', () => { showerPetals(18); showToast('চাঁদের কাছে তোমার জন্য একটা সুন্দর ইচ্ছে পাঠানো হলো ✨'); });
$('#backTopBtn')?.addEventListener('click', () => {
  if (experience) experience.classList.remove('show');
  if (openScreen) openScreen.style.display = '';
  giftOpened = false;
  envelopeOpened = false;
  surpriseOpened = false;
  envelope?.classList.remove('open');
  surprise?.classList.remove('show');
  surpriseText?.classList.remove('show');
  specialMessage?.classList.remove('show');
  if (envelopeHint) envelopeHint.textContent = '💌 খামটাতে একটু চাপ দাও';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
   
