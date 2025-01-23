document.addEventListener("DOMContentLoaded", function () {
    // Fetch the projects JSON file
    fetch("project/projects.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch projects JSON");
            }
            return response.json();
        })
        .then((data) => {
            const container = document.querySelector(".projects-grid");
            const filterButtons = document.querySelectorAll(".filter-btn");

            // Ensure container exists
            if (!container) {
                console.error("Projects container not found in DOM");
                return;
            }

            // Filters configuration
            const filters = {
                database: ["phpMyAdmin", "mySql", "SQL", "SqlAlchemy"],
                web: ["Symfony", "Html/CSS", "Twig", "Tailwind", "JavaScript"],
                symfony: ["Symfony"],
                git: ["GitHub", "GitLab"],
                csharp: ["C#"],
                c: ["C"],
                java: ["Java"],
            };

            // Function to render projects
            function renderProjects(filter = "all") {
                container.innerHTML = ""; // Clear the grid

                // Filter projects based on the selected filter
                const filteredProjects = data.filter((project) =>
                    filter === "all"
                        ? true
                        : project.technologies.some((tech) =>
                              filters[filter]?.includes(tech)
                          )
                );

                // Render each project card
                filteredProjects.forEach((project) => {
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
                            <h2 class="date">${project.date || "Date not available"}</h2>
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
            }

            // Event listeners for filter buttons
            filterButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const filter = button.getAttribute("data-filter");
                    renderProjects(filter);
                });
            });

            // Default: Show all projects on page load
            renderProjects();
        })
        .catch((error) => {
            console.error("Error loading projects:", error);
        });
});

// Navigate to project details
function viewProject(projectId) {
    localStorage.setItem("selectedProjectId", projectId);
    window.location.href = "html/project-details.html";
}

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Remove 'clicked' class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('clicked');
        });

        // Add 'clicked' class to the current button
        this.classList.add('clicked');
    });
});

// Set "All" button as default clicked
const allButton = document.querySelector('.filter-btn[data-filter="all"]');
if (allButton) {
    allButton.classList.add('clicked');
}

