document.addEventListener("DOMContentLoaded", function () {
    // Fetch the projects JSON file
    fetch("project/projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch projects JSON");
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector(".projects-grid");

            // Ensure container exists
            if (!container) {
                console.error("Projects container not found in DOM");
                return;
            }

            data.forEach(project => {
                console.log("Processing project:", project);
                console.log("Date : ", project.date);
                console.log("Short Description : ", project.shortDescription);

                // Create the card
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                <div class="image" 
                    style="background-color: rgb(239, 205, 255); 
                            background-image: url('${project.images[0]}'); 
                            background-size: cover;">
                </div>
                <div class="content">
                    <a href="#" onclick="viewProject('${project.id}')">
                        <span class="title">${project.title}</span>
                    </a>
                    <h2 class="date">${project.date || "Date not available"}</h2> <!-- Ensure date is shown -->
                    <p class="desc">${project.shortDescription}</p>
                    <a class="action" href="#" onclick="viewProject('${project.id}')">
                        Find out more
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            `;


                // Append card to the container
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading projects:", error);
        });
});

// Navigate to project details
function viewProject(projectId) {
    localStorage.setItem("selectedProjectId", projectId);
    window.location.href = "/portfolio/html/project-details.html";
}
