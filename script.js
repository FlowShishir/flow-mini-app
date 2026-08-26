/* ==========================================
   ELEMENTS
========================================== */

const openGift =
    document.getElementById("openGift");

const landingScreen =
    document.getElementById("landingScreen");

const letterScreen =
    document.getElementById("letterScreen");

const envelope =
    document.getElementById("envelope");

const typingText =
    document.getElementById("typingText");

const typingCursor =
    document.querySelector(".typing-cursor");


/* ==========================================
   TYPING MESSAGE
========================================== */

const message =
    "তোমাকে একটা ছোট্ট কথা বলার ছিল... তুমি আমার জীবনের খুব সুন্দর একটা অংশ।";


/* ==========================================
   OPEN GIFT
========================================== */

openGift.addEventListener("click", () => {

    openGift.style.transform =
        "scale(0.94)";


    setTimeout(() => {

        openGift.style.transform =
            "";

    }, 150);


    landingScreen.style.opacity =
        "0";

    landingScreen.style.transform =
        "scale(0.96)";


    setTimeout(() => {

        landingScreen.style.display =
            "none";


        letterScreen.classList.add(
            "active"
        );


        startTyping();

    }, 700);

});


/* ==========================================
   TYPING ANIMATION
========================================== */

function startTyping() {

    typingText.textContent =
        "";

    typingCursor.style.opacity =
        "1";


    let index = 0;

    const typingSpeed =
        65;


    function typeCharacter() {

        if (
            index <
            message.length
        ) {

            typingText.textContent +=
                message.charAt(index);

            index++;


            setTimeout(
                typeCharacter,
                typingSpeed
            );

        }

        else {

            setTimeout(() => {

                typingCursor.style.opacity =
                    "0.5";

            }, 1000);

        }

    }


    typeCharacter();

}


/* ==========================================
   ENVELOPE OPEN
========================================== */

envelope.addEventListener(
    "click",
    () => {

        if (
            envelope.classList.contains(
                "opened"
            )
        ) {
            return;
        }


        envelope.classList.add(
            "opened"
        );


        /*
         * Envelope খোলার পর
         * paper-এর ভিতরে scroll
         * automatically possible হবে।
         */


        setTimeout(() => {

            const paper =
                document.querySelector(
                    ".paper-content"
                );


            if (paper) {

                paper.scrollTop =
                    0;

            }

        }, 1000);

    }
);
