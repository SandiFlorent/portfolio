document.addEventListener("DOMContentLoaded", function () {
    const projectId = localStorage.getItem("selectedProjectId");
    if (!projectId) return;

    fetch("../project/projects.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // Log the data to check if it's fetched correctly

            const project = data.find((proj) => proj.id === projectId);
            if (!project) return;

            // Populate title
            document.getElementById("project-title").innerText = project.title;

            // Populate the date (newly added)
            document.getElementById("project-date").innerText = project.date;

            // Populate GitHub link
            const gitLink = document.getElementById("project-git-link");
            gitLink.href = project.gitLink;
            gitLink.textContent = `GitHub - ${project.title}`;

            // Populate images and enable gallery functionality
            const imagesContainer = document.getElementById("project-images");
            project.images.forEach((image, index) => {
                const imgElement = document.createElement("img");
                imgElement.src = image;
                imgElement.alt = `${project.title} Image`;
                imgElement.classList.add("project-image");
                imgElement.dataset.index = index; // Store the image index for navigation
                imagesContainer.appendChild(imgElement);
            });

            enableGallery(project.images); // Enable gallery functionality

            // Populate full descriptions
            const descriptionsContainer = document.getElementById("project-full-descriptions");
            project.fullDescriptions.forEach((description) => {
                const p = document.createElement("p");
                p.textContent = description;
                descriptionsContainer.appendChild(p);
            });

            // Populate technologies
            const techList = document.getElementById("project-technologies");
            project.technologies.forEach((tech) => {
                const li = document.createElement("li");
                li.textContent = tech;
                techList.appendChild(li);
            });
        })
        .catch((error) => console.error("Error fetching data:", error)); // Handle any error fetching the JSON
});

function enableGallery(images) {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.classList.add("hidden");

    lightbox.innerHTML = `
        <button class="close-btn">&times;</button>
        <img id="lightbox-image" src="" alt="Gallery Image">
        <button class="prev-btn">&lsaquo;</button>
        <button class="next-btn">&rsaquo;</button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const imageElements = document.querySelectorAll(".project-image");

    let currentIndex = 0;

    // Open Lightbox
    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = images[index];
        lightbox.classList.remove("hidden");
    }

    // Close Lightbox
    function closeLightbox() {
        lightbox.classList.add("hidden");
    }

    // Show Next Image
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex];
    }

    // Show Previous Image
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex];
    }

    // Add Event Listeners
    imageElements.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
    });
    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // Close on Background Click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard Navigation
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("hidden")) {
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") closeLightbox();
        }
    });
}
