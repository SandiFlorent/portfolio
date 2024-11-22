document.addEventListener("scroll", () => {
    const floatingNavbar = document.querySelector(".floating-navbar");

    // Check scroll position
    if (window.scrollY > floatingNavbar.offsetHeight) {
        floatingNavbar.style.opacity = "0"; // Fade out floating navbar
        document.body.classList.add("scrolled"); // Show sticky navbar
    } else {
        floatingNavbar.style.opacity = "1"; // Fade in floating navbar
        document.body.classList.remove("scrolled"); // Hide sticky navbar
    }
});