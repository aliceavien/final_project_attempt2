const apiKey = "ecb2320e2edebfb44db0dfb5c6cca0ca";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const countryApiUrl = "https://restcountries.com/v3.1/name/";

const searchInput = document.getElementById("searchInput");
const weatherIcon = document.querySelector(".weather-icon");

async function search() {
    const city = searchInput.value;

    // Fetch weather data
    const weatherResponse = await fetch(weatherApiUrl + city + `&appid=${apiKey}`);
    const weatherData = await weatherResponse.json();

    // Fetch country data
    const countryResponse = await fetch(countryApiUrl + city);
    const countryData = await countryResponse.json();

    // Display weather and country data
    displayWeatherData(weatherData);
    displayCountryData(countryData);
    document.getElementById('show').style.display='inline-block';
    document.getElementById('hide').style.display='none';
    document.getElementById('countryData').style.display='none';;
}

function displayWeatherData(data) {
    if (data.cod === "404") {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";



        setWeatherIcon(data.weather[0].main);

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

function setWeatherIcon(weatherMain) {
    const iconPath = `images/${weatherMain.toLowerCase()}.png`;

    if (weatherMain == "Clouds") {
        weatherIcon.src = "images/clouds.png"
    } else if (weatherMain == "Clear") {
        weatherIcon.src = "images/clear.png"
    } else if (weatherMain == "Rain") {
        weatherIcon.src = "images/rain.png"
    } else if (weatherMain == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    } else if (weatherMain == "Mist") {
        weatherIcon.src = "images/mist.png"
    } else(
        weatherIcon.src = "images/rainy.jpg"
    )
}

function displayCountryData(data) {
    const countryDataContainer = document.getElementById("countryData");
    countryDataContainer.innerHTML = "";

    data.forEach(country => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p>Population: ${country.population}</p>
            <p>Capital: ${country.capital}</p>
            <p>Flag of the country:<img src="${country.flags.svg}" alt="Flag" class="flag-image" width='300px'></p>
        `;

        countryDataContainer.appendChild(card);
    });
}

function showMore(){
    document.getElementById('countryData').style.display='block';
    document.getElementById('hide').style.display='inline-block';
    document.getElementById('show').style.display='none';
}
function hide(){
    document.getElementById('countryData').style.display='none';
    document.getElementById('hide').style.display='none';
    document.getElementById('show').style.display='inline-block';
}