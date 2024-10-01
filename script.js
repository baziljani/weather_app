const apikey = "92789ded518c4f5af7069b8e91ff0ce1"; // Your OpenWeatherMap API key
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Set weather icon based on condition
        if (data.weather[0].main == "Clouds") {
            weathericon.src = "assets/cloudyy.png";
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "assets/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "assets/rain.jpeg";
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "assets/cloudyy.png";
        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "assets/mist.jpeg";
        }

        document.querySelector(".error").style.display = "none"; // Hide error message
        document.querySelector(".weather").style.display = "block"; // Show weather details
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // document.querySelector(".error").innerHTML = "Failed to fetch weather data. Please try again.";
        document.querySelector(".error").style.display = "block"; // Show error message
        document.querySelector(".weather").style.display = "none"; // Hide weather details
    }
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim(); // Get the city name from the input
    if (city) {
        checkWeather(city); // Call the weather check function with the city name
    } else {
        document.querySelector(".error").innerHTML = "Please enter a city name.";
        document.querySelector(".error").style.display = "block"; // Show error message
        document.querySelector(".weather").style.display = "none"; // Hide weather details
    }
});

// Optionally, you can call checkWeather with a default city:
// checkWeather("Bengaluru");
