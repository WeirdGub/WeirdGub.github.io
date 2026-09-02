const projectData = {
    jeff: {
        title: "Jeff Chalmers Laboratory for Cell Analysis and Separation",
        description:
            "I collaborated on multi-scale bioreactor hydrodynamic modeling, building CFD workflows that pre-solved velocity fields and fed downstream cell-kinetics and glycosylation modeling efforts.",
        specs: [
            "Simulated common industrial reactor geometries from 50 L pilot scale to 20,000 L production scale.",
            "Used ANSYS Fluent with hex-dominant meshing, turbulence models, MRF, and dynamic sliding mesh methods.",
            "Implemented multiphase VOF where needed and used strategic single-phase simplifications for faster iteration.",
            "Migrating into Fluent accelerated the simulation pipeline while increasing physical realism."
        ],
        media: [
            {
                type: "video",
                src: "assets/fluent_velocity_with_bot_animation.mp4",
                alt: "Bioreactor CFD velocity field animation from ANSYS Fluent"
            }
        ]
    },
    hyacinth: {
        title: "BSLI Hyacinth Fuel Pump Lead",
        description:
            "As fuel pump team lead on Hyacinth, I led design decisions, delegated subsystem work across a team of three peers, and engineered a cryogenic methane pump architecture to satisfy aggressive pressure and power targets.",
        specs: [
            "Engine context: 18.2 kN (about 4,100 lbf) open-cycle gas-generator methalox engine.",
            "Target chamber pressure: 4.8 MPa (700 psi).",
            "Fuel pump discharge pressure: 5.965 MPa.",
            "Shaft power requirement: 58.5 kW.",
            "Differential pressure boost: 5.265 MPa (from 0.7 MPa tank baseline).",
            "Hydraulic head: 1,268.79 m and volumetric flow rate: 0.003889 m^3/s (3.89 L/s)."
        ],
        media: [
            {
                type: "imageSlot",
                src: "assets/hyacinth-fuel-pump.jpg",
                alt: "Hyacinth fuel pump",
                label: "Image Slot: add assets/hyacinth-fuel-pump.jpg"
            }
        ]
    },
    balancer: {
        title: "BSLI Pump Balancer Project",
        description:
            "I designed a reusable turbopump balancer from scratch in SolidWorks and led a small team to deliver a safe, low-cost system that can identify rotational imbalance location by syncing force, RPM, and shaft position data.",
        specs: [
            "Designed around a strict total budget of about $200.",
            "Accommodates multiple pump sizes for long-term club reuse.",
            "Safety-constrained design considered testing at up to 10,000 RPM.",
            "Led a team of two researchers on sensor and component trade studies."
        ],
        media: [
            {
                type: "imageSlot",
                src: "assets/pump-balancer.jpg",
                alt: "Pump balancer design",
                label: "Image Slot: add assets/pump-balancer.jpg"
            }
        ]
    },
    robotics: {
        title: "OSU FEH Robotics Competition - 3-Wheel Kiwi Drive Robot",
        description:
            "I helped design, build, and program an autonomous kiwi-drive robot that completed a complex task course with high reliability, including sensing logic, actuator control, and custom mechanical interfaces.",
        specs: [
            "Placed 2nd out of 70 teams.",
            "Earned perfect scores in all 6 competition runs.",
            "Used omni-directional kiwi-drive motion with PID and localization logic.",
            "Integrated brushless drive motors plus servo systems for course interactions."
        ],
        media: [
            {
                type: "imageSlot",
                src: "assets/robotics-build.jpg",
                alt: "3-wheel kiwi drive robot build",
                label: "Image Slot 1: add assets/robotics-build.jpg"
            },
            {
                type: "imageSlot",
                src: "assets/robotics-run.jpg",
                alt: "FEH robotics competition run",
                label: "Image Slot 2: add assets/robotics-run.jpg"
            }
        ]
    }
};

const showcaseShell = document.getElementById("showcaseShell");
const projectGrid = document.getElementById("projectGrid");
const projectFocus = document.getElementById("projectFocus");
const focusTitle = document.getElementById("focusTitle");
const focusMedia = document.getElementById("focusMedia");
const focusDescription = document.getElementById("focusDescription");
const focusSpecs = document.getElementById("focusSpecs");
const focusBackButton = document.getElementById("focusBackButton");
const openShowcaseBtn = document.getElementById("openShowcaseBtn");

if (openShowcaseBtn) {
    openShowcaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showGrid();
        document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    });
}

function createMediaCard(mediaItem) {
    const card = document.createElement("div");
    card.className = "media-card";

    if (mediaItem.type === "video") {
        const video = document.createElement("video");
        video.src = mediaItem.src;
        video.controls = true;
        video.preload = "metadata";
        video.setAttribute("aria-label", mediaItem.alt || "Project video");
        card.appendChild(video);
        return card;
    }

    if (mediaItem.type === "image") {
        const image = document.createElement("img");
        image.src = mediaItem.src;
        image.alt = mediaItem.alt || "Project image";
        card.appendChild(image);
        return card;
    }

    if (mediaItem.type === "imageSlot") {
        const placeholder = document.createElement("div");
        placeholder.className = "media-placeholder";
        placeholder.textContent = mediaItem.label || "Media slot";

        const image = document.createElement("img");
        image.src = mediaItem.src;
        image.alt = mediaItem.alt || "Project image";
        image.hidden = true;
        image.addEventListener("load", () => {
            placeholder.hidden = true;
            image.hidden = false;
        });

        card.appendChild(placeholder);
        card.appendChild(image);
        return card;
    }

    const placeholder = document.createElement("div");
    placeholder.className = "media-placeholder";
    placeholder.textContent = mediaItem.label || "Media slot";
    card.appendChild(placeholder);
    return card;
}

function renderProject(projectId) {
    const project = projectData[projectId];

    if (!project) {
        return;
    }

    focusTitle.textContent = project.title;
    focusDescription.textContent = project.description;

    focusMedia.innerHTML = "";
    project.media.forEach((mediaItem) => {
        focusMedia.appendChild(createMediaCard(mediaItem));
    });
    focusMedia.classList.toggle("single", project.media.length === 1);

    focusSpecs.innerHTML = "";
    project.specs.forEach((spec) => {
        const item = document.createElement("li");
        item.textContent = spec;
        focusSpecs.appendChild(item);
    });
}

function showProject(projectId) {
    renderProject(projectId);
    projectGrid.hidden = true;
    projectFocus.hidden = false;
    showcaseShell.classList.add("expanded");
}

function showGrid() {
    projectGrid.hidden = false;
    projectFocus.hidden = true;
    showcaseShell.classList.remove("expanded");
}

const tiles = projectGrid.querySelectorAll(".project-tile");
tiles.forEach((tile) => {
    const projectId = tile.dataset.project;
    tile.addEventListener("click", () => {
        showProject(projectId);
    });
    tile.addEventListener("focus", () => {
        showProject(projectId);
    });
});

focusBackButton.addEventListener("click", showGrid);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !projectFocus.hidden) {
        showGrid();
    }
});
