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
    "তোমার জন্য একটা ছোট্ট চিঠি... ❤️";


/* ==========================================
   OPEN GIFT BUTTON
========================================== */

openGift.addEventListener("click", () => {

    /* Button press effect */

    openGift.style.transform =
        "scale(0.94)";


    setTimeout(() => {

        openGift.style.transform = "";

    }, 150);


    /* Landing screen fade out */

    landingScreen.style.opacity = "0";

    landingScreen.style.transform =
        "scale(0.96)";


    /* Wait for transition */

    setTimeout(() => {

        landingScreen.style.display =
            "none";


        /* Show Letter Screen */

        letterScreen.classList.add("active");


        /* Start typing */

        startTyping();

    }, 700);

});


/* ==========================================
   TYPING ANIMATION
========================================== */

function startTyping() {

    typingText.textContent = "";

    typingCursor.style.opacity = "1";

    let index = 0;

    const typingSpeed = 80;


    function typeCharacter() {

        if (index < message.length) {

            typingText.textContent +=
                message.charAt(index);

            index++;

            setTimeout(
                typeCharacter,
                typingSpeed
            );

        } else {

            /* Typing finished */

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

envelope.addEventListener("click", () => {

    /* Prevent opening again */

    if (
        envelope.classList.contains("opened")
    ) {
        return;
    }


    /* Open envelope */

    envelope.classList.add("opened");

});
