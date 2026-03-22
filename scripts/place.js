// --- Footer Updates ---
// Set current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set last modified date using the span ID from your HTML
document.getElementById("lastModified").textContent = document.lastModified;

// --- Wind Chill Calculation ---
/**
 * Calculates Wind Chill factor for Metric units (Celsius/kmh)
 * Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
 */
const calculateWindChill = (t, v) => 
    (13.12 + (0.6215 * t) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * t * Math.pow(v, 0.16))).toFixed(1);

const displayWindChill = () => {
    // Get the values directly from your HTML elements
    const tempElement = document.getElementById("temp-val");
    const windElement = document.getElementById("wind-val");
    const wcOutput = document.getElementById("windchill-val");

    // Convert string content to numbers
    const t = parseFloat(tempElement.textContent);
    const v = parseFloat(windElement.textContent);

    // Logic to display wind chill or "N/A" based on assignment requirements
    // Conditions: Temp <= 10°C AND Wind Speed > 4.8 km/h
    if (t <= 10 && v > 4.8) {
        const result = calculateWindChill(t, v);
        wcOutput.textContent = `${result} °C`;
    } else {
        wcOutput.textContent = "N/A";
    }
};

// Run the function when the page is fully loaded
window.addEventListener("load", displayWindChill);