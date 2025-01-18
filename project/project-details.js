// In project-details.js

document.addEventListener("DOMContentLoaded", function () {
    const projectId = localStorage.getItem("selectedProjectId");
    if (!projectId) return;

    fetch("../project/projects.json") 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Log the data to check if it's fetched correctly

            const project = data.find(proj => proj.id === projectId);
            if (!project) return;

            // Populate title
            document.getElementById("project-title").innerText = project.title;

            // Populate the date (newly added)
            document.getElementById("project-date").innerText = project.date;

            // Populate GitHub link
            const gitLink = document.getElementById("project-git-link");
            gitLink.href = project.gitLink;
            gitLink.textContent = `GitHub - ${project.title}`;

            // Populate images
            const imagesContainer = document.getElementById("project-images");
            project.images.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = image;
                imgElement.alt = `${project.title} Image`;
                imagesContainer.appendChild(imgElement);
            });

            // Populate full descriptions
            const descriptionsContainer = document.getElementById("project-full-descriptions");
            project.fullDescriptions.forEach(description => {
                const p = document.createElement("p");
                p.textContent = description;
                descriptionsContainer.appendChild(p);
            });

            // Populate technologies
            const techList = document.getElementById("project-technologies");
            project.technologies.forEach(tech => {
                const li = document.createElement("li");
                li.textContent = tech;
                techList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching data:", error));  // Handle any error fetching the JSON
});
