
// 1. Array of Temple Objects (with 3 additional temples added at the end)
const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Adding 3 new temple objects:
    {
      templeName: "Salt Lake",
      location: "Salt Lake City, Utah, United States",
      dedicated: "1893, April, 6",
      area: 253015,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
      templeName: "Rome Italy",
      location: "Rome, Italy",
      dedicated: "2019, March, 10",
      area: 40000,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/2-Rome-Temple-2190090.jpg"
    },
    {
      templeName: "Nauvoo Illinois",
      location: "Nauvoo, Illinois, United States",
      dedicated: "2002, June, 27",
      area: 54000,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/400x250/nauvoo-temple-736408-wallpaper.jpg"
    }
  ];
  
// 2. Select the HTML elements we need to interact with
const container = document.querySelector("#temple-cards-container");
const pageTitle = document.querySelector("#page-title");

// Navigation Links
const homeLink = document.querySelector("#home");
const oldLink = document.querySelector("#old");
const newLink = document.querySelector("#new");
const largeLink = document.querySelector("#large");
const smallLink = document.querySelector("#small");
  
// 3. Function to build and display temple cards
function createTempleCards(filteredTemples) {
    // Clear out the container before adding new cards
    container.innerHTML = ""; 

    filteredTemples.forEach(temple => {
        // Create elements
        let card = document.createElement("figure");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");

        // Populate elements with data
        name.textContent = temple.templeName;
        location.innerHTML = `<span>Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span>Size:</span> ${temple.area} sq ft`;

        // Configure the image (Native lazy loading included)
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "400");
        img.setAttribute("height", "250");

        // Append everything to the figure element
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);

        // Append the figure to the main container
        container.appendChild(card);
    });
}
  
// 4. Set up Event Listeners for Filtering
// Helper function to extract just the year from the "YYYY, Month, DD" string
const getYear = (dateString) => parseInt(dateString.split(",")[0]);

homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Home";
    createTempleCards(temples);
});

oldLink.addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Old Temples";
    const oldTemples = temples.filter(temple => getYear(temple.dedicated) < 1900);
    createTempleCards(oldTemples);
});

newLink.addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "New Temples";
    const newTemples = temples.filter(temple => getYear(temple.dedicated) > 2000);
    createTempleCards(newTemples);
});

largeLink.addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Large Temples";
    const largeTemples = temples.filter(temple => temple.area > 90000);
    createTempleCards(largeTemples);
});

smallLink.addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Small Temples";
    const smallTemples = temples.filter(temple => temple.area < 10000);
    createTempleCards(smallTemples);
});

// 5. Initialize the page on first load
createTempleCards(temples);

// 6. Update the Footer Dates dynamically
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
