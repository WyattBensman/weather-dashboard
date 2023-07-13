// Important Variables
let apiKey = '8991a5a08a579f8f779c2c15d485fec3';
let baseURL = 'https://api.openweathermap.org/data/2.5'
let history = [];

// Aside Elements
let searchedCity = document.querySelector('#searchedCity')
let userForm = document.querySelector('.userForm')
let historyBtnSection = document.querySelector('.historyBtnSection')

// Grab the User Input
let formSubmitHandler = (e) => {
    e.preventDefault();

    let city = searchedCity.value.trim();
    console.log(city);

    if (city) {
        // Functions to Fetch the Data
        fetchWeather(city);
        fetchFiveDay(city);

        // Appends to the History Section
        const historyBtn = document.createElement('button');
        historyBtn.id = 'searchedCityBtn';
        historyBtn.classList.add('historyBtn', 'w-100');
        historyBtn.textContent = city;
        historyBtnSection.appendChild(historyBtn);

        // Whenever Button is Clicked, Data is fetched
        historyBtn.addEventListener('click', () => {
            fetchWeather(city);
            fetchFiveDay(city);
        });

    } else {
        alert('Youre done')
    }
}

// When Search Button [Form] is Clicked [Submitted]
userForm.addEventListener('submit', formSubmitHandler);


// Get the current date
let currentDate = new Date();

// Extract the day, month, and year from the current date
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; // Note: Months are zero-based (0-January, 1-February, etc.)
let year = currentDate.getFullYear();

// Format the date as "MM/DD/YYYY"
let formattedDate = ` (${month}/${day}/${year})`;


// Top Fetch Weather Elements
let cityNameElement = document.querySelector('#cityName')
let currentDateElement = document.querySelector('#currentDate')
let tempElement = document.querySelector('#temp');
let windElement = document.querySelector('#wind');
let humidityElement = document.querySelector('#humidity');
let topWeatherIconElement = document.querySelector('#topWeatherIcon'); // New element for weather icon


// Placeholder Values for No Search
cityNameElement.textContent = 'City';
tempElement.textContent = 'Temp: -- °F';
windElement.textContent = 'Wind: -- MPH';
humidityElement.textContent = 'Humidity: -- %';
topWeatherIconElement.src = '';

// Fetch Weather Data
function fetchWeather(city) {
    const url = `${baseURL}/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data);

            // Grab the Weather Data
            const temp = Math.round((data.main.temp - 273.15) * 9 / 5 + 32);
            const wind = data.wind.speed;
            const humidity = data.main.humidity;
            const weatherIcon = data.weather[0].icon;

            // Append the content onto page
            cityNameElement.textContent = city;
            currentDateElement.textContent = formattedDate;
            tempElement.textContent = `Temp: ${temp} °F`;
            windElement.textContent = `Wind: ${wind} MPH`;
            humidityElement.textContent = `Humidity: ${humidity}%`
            topWeatherIconElement.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
        })
        .catch(error => {
            console.log('An error occured', error);
        })
}


// 5-Day Forecast Elements
let fiveDayDate = document.querySelector('#fiveDayDate');
let fiveDayTemp = document.querySelector('#fiveDayTemp')
let weatherIconElement = document.querySelector('#weatherIcon');
let fiveDayWind = document.querySelector('#fiveDayWind');
let fiveDayHumidity = document.querySelector('#fiveDayHumidity');
let forecastContainer = document.querySelector('#forecastContainer');

// Clear 5-Day Forecast / Clears previous Forecast
function clearFiveDayForecast() {
    while (forecastContainer.firstChild) {
        forecastContainer.removeChild(forecastContainer.firstChild);
    }
}

// Fetch 5-Day Weather Forecast
function fetchFiveDay(city) {
    const fiveDayUrl = `${baseURL}/forecast?q=${city}&appid=${apiKey}`;

    clearFiveDayForecast();

    fetch(fiveDayUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(`This is the ${data}`);

            // Grab the Weather Data
            const firstFiveForecasts = data.list.slice(0, 5);

            firstFiveForecasts.forEach((forecast, index) => {
                const temp = Math.round((forecast.main.temp - 273.15) * 9 / 5 + 32);
                const weatherIcon = forecast.weather[0].icon;
                const wind = forecast.wind.speed;
                const humidity = forecast.main.humidity;
                const date = new Date(forecast.dt * 1000).toLocaleDateString();

                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + index + 1);
                const currentDateString = currentDate.toLocaleDateString();

                // Append the card onto page
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('card', 'col', 'mx-2');
                forecastCard.innerHTML = `
                <h6 id="fiveDayDate">${currentDateString}</h6>
                <p><img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon"></p>
                <p>Temperature: ${temp} °F</p>
                <p>Wind: ${wind} MPH</p>
                <p>Humidity: ${humidity}%</p>
                `

                forecastContainer.appendChild(forecastCard);
            });
        })
        .catch(error => {
            console.log('An error occurred', error);
        });
}