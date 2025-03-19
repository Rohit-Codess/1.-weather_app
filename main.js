const apiKey = "99a2bf68ebe6c323ef0bd82a10ae7257"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch weather data
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        
        // Update UI with fetched data
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".details .col:nth-child(1) p:first-child").innerText = `${data.main.humidity}%`;
        document.querySelector(".details .col:nth-child(2) p:first-child").innerText = `${data.wind.speed} km/h`;

        // Update weather icon based on conditions
        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition.includes("cloud")) {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition.includes("clear")) {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition.includes("rain")) {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition.includes("snow")) {
            weatherIcon.src = "images/snow.png";
        } else {
            weatherIcon.src = "images/mist.png";
        }

    } catch (error) {
        alert(error.message);
    }
}

// Event Listeners for searching weather
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Default city on page load
checkWeather("Ranchi");
