const openGift = document.getElementById("openGift");

openGift.addEventListener("click", () => {

    openGift.style.transform = "scale(0.94)";

    setTimeout(() => {
        openGift.style.transform = "";
    }, 150);

    // পরের ধাপে এখানে Gift Open করার animation যোগ করব

});
