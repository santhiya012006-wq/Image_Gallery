// ==========================================
// GET ELEMENTS
// ==========================================

const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const searchInput =
    document.getElementById("searchInput");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const imageCounter =
    document.getElementById("imageCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const zoomInBtn =
    document.getElementById("zoomInBtn");

const zoomOutBtn =
    document.getElementById("zoomOutBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const themeBtn =
    document.getElementById("themeBtn");


// ==========================================
// VARIABLES
// ==========================================

let visibleImages = [];

let currentIndex = 0;

let zoomLevel = 1;


// ==========================================
// UPDATE VISIBLE IMAGES
// ==========================================

function updateVisibleImages() {

    visibleImages =
        Array.from(galleryItems).filter(item => {

            return !item.classList.contains("hide");

        });

}


// ==========================================
// OPEN LIGHTBOX
// ==========================================

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        updateVisibleImages();

        currentIndex =
            visibleImages.indexOf(item);

        zoomLevel = 1;

        showImage(currentIndex);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// ==========================================
// SHOW IMAGE
// ==========================================

function showImage(index) {

    if (visibleImages.length === 0) {
        return;
    }


    // Loop backwards

    if (index < 0) {

        index =
            visibleImages.length - 1;

    }


    // Loop forwards

    if (index >= visibleImages.length) {

        index = 0;

    }


    currentIndex = index;


    const item =
        visibleImages[currentIndex];


    const image =
        item.querySelector("img");


    const title =
        item.querySelector("h3");


    const category =
        item.querySelector("p");


    // Update lightbox image

    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;


    // Update title

    lightboxTitle.textContent =
        title.textContent;


    // Update category

    lightboxCategory.textContent =
        category.textContent;


    // Update counter

    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;


    // Reset zoom

    zoomLevel = 1;

    lightboxImage.style.transform =
        `scale(${zoomLevel})`;

}


// ==========================================
// NEXT IMAGE
// ==========================================

nextBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    showImage(currentIndex + 1);

});


// ==========================================
// PREVIOUS IMAGE
// ==========================================

prevBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    showImage(currentIndex - 1);

});


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    zoomLevel = 1;

    lightboxImage.style.transform =
        "scale(1)";

}


closeBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    closeLightbox();

});


// ==========================================
// CLOSE BY CLICKING BACKGROUND
// ==========================================

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase().trim();


    galleryItems.forEach(item => {

        const title =
            item.dataset.title.toLowerCase();

        const category =
            item.dataset.category.toLowerCase();


        if (
            title.includes(searchText) ||
            category.includes(searchText)
        ) {

            item.classList.remove("hide");

        } else {

            item.classList.add("hide");

        }

    });


    updateVisibleImages();

});


// ==========================================
// CATEGORY FILTER
// ==========================================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Active button

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // Clear search

        searchInput.value = "";


        const filter =
            button.dataset.filter;


        galleryItems.forEach(item => {

            const category =
                item.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });


        updateVisibleImages();

    });

});


// ==========================================
// ZOOM IN
// ==========================================

zoomInBtn.addEventListener("click", function (event) {

    event.stopPropagation();


    if (zoomLevel < 2.5) {

        zoomLevel += 0.25;

        lightboxImage.style.transform =
            `scale(${zoomLevel})`;

    }

});


// ==========================================
// ZOOM OUT
// ==========================================

zoomOutBtn.addEventListener("click", function (event) {

    event.stopPropagation();


    if (zoomLevel > 0.75) {

        zoomLevel -= 0.25;

        lightboxImage.style.transform =
            `scale(${zoomLevel})`;

    }

});


// ==========================================
// FULLSCREEN
// ==========================================

fullscreenBtn.addEventListener("click", function () {

    if (!document.fullscreenElement) {

        lightbox.requestFullscreen().catch(() => {});

    } else {

        document.exitFullscreen();

    }

});


// ==========================================
// DARK / LIGHT MODE
// ==========================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }

});


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener("keydown", function (event) {

    if (
        !lightbox.classList.contains("active")
    ) {
        return;
    }


    // Right arrow

    if (event.key === "ArrowRight") {

        showImage(currentIndex + 1);

    }


    // Left arrow

    if (event.key === "ArrowLeft") {

        showImage(currentIndex - 1);

    }


    // Escape

    if (event.key === "Escape") {

        closeLightbox();

    }


    // Zoom +

    if (event.key === "+") {

        zoomInBtn.click();

    }


    // Zoom -

    if (event.key === "-") {

        zoomOutBtn.click();

    }

});


// ==========================================
// INITIALIZE
// ==========================================

updateVisibleImages();