// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // 3 additional temples
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/93a01430a50b0439656100e3c2116421f184a8ad/full/1280%2C/0/default"
    },
    {
        templeName: "Paris France",
        location: "Le Chesnay, France",
        dedicated: "2017, May, 21",
        area: 44000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2055.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://churchofjesuschrist.org/imgs/f665703fc6de4b818f4ba2e025fc41f6183d80a8/full/3840%2C/0/default"
    },
    {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2616.jpg"
    },
    {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52590,
    imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-8154.jpg"

    }
];


// Display function
function displayTemples(templesToDisplay) {
    const container = document.getElementById('temples-container');
    container.innerHTML = ''; // Clear existing

    templesToDisplay.forEach(temple => {
        const card = document.createElement('section');
        card.classList.add('temple-card');

        card.innerHTML = `
            <h2>${temple.templeName}</h2>
            <p>Location: ${temple.location}</p>
            <p>Dedicated: ${temple.dedicated}</p>
            <p>Area: ${temple.area.toLocaleString()} sq ft</p>
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Event listeners
    document.getElementById('home').addEventListener('click', () => {
        displayTemples(temples);
    });

    document.getElementById('old').addEventListener('click', () => {
        const oldTemples = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(',')[0]);
            return year < 1900;
        });
        displayTemples(oldTemples);
    });

    document.getElementById('new').addEventListener('click', () => {
        const newTemples = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(',')[0]);
            return year > 2000;
        });
        displayTemples(newTemples);
    });

    document.getElementById('large').addEventListener('click', () => {
        const largeTemples = temples.filter(temple => temple.area > 90000);
        displayTemples(largeTemples);
    });

    document.getElementById('small').addEventListener('click', () => {
        const smallTemples = temples.filter(temple => temple.area < 10000);
        displayTemples(smallTemples);
    });

    // Initial display
    displayTemples(temples);

    // Footer Year and Last Modified
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    // Toggle mobile navigation with hamburger and 'X' close symbol
    const menuButton = document.getElementById("menu-button");
    const nav = document.getElementById("primary-nav");

    if (menuButton && nav) {
        // Initialize button symbol to hamburger
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");

        menuButton.addEventListener("click", () => {
            nav.classList.toggle("hide");

            const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isExpanded));

            if (nav.classList.contains("hide")) {
                menuButton.textContent = "☰"; // hamburger icon
            } else {
                menuButton.textContent = "✖"; // close icon
            }
        });
    }
});