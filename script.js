// Important Variables
let apiKey = '8991a5a08a579f8f779c2c15d485fec3';
let baseURL = 'https://api.openweathermap.org/data/2.5'
let history = [];

// Aside Elements
let searchedCity = document.querySelector('#searchedCity')
let userForm = document.querySelector('.userForm')

// Grab the User Input
let formSubmitHandler = (e) => {
    e.preventDefault();

    let city = searchedCity.value.trim();
    console.log(city);

    if (city) {
        fetchWeather(city);
    } else {
        alert('Youre done')
    }
}

userForm.addEventListener('submit', formSubmitHandler);


// Top Fetch Weather Elements
let cityNameElement = document.querySelector('#cityName')
let currentDateElement = document.querySelector('#currentDate')
let tempElement = document.querySelector('#temp');
let windElement = document.querySelector('#wind');
let humidityElement = document.querySelector('#humidity');

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

            // Append the content onto page
            cityNameElement.textContent = city;
            tempElement.textContent = `Temp: ${temp}`;
            windElement.textContent = `Wind: ${wind}`;
            humidityElement.textContent = `Humidity: ${humidity}`
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

// Fetch 5-Day Weather Forecast
function fetchFiveDay(city) {
    const fiveDayUrl = `${baseURL}/forecast?q=${city}&appid=${apiKey}`;

    fetch(fiveDayUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(`This is the ${data}`);

            // Process the Weather Data
            const firstFiveForecasts = data.list.slice(0, 5);

            firstFiveForecasts.forEach(forecast => {
                const temp = Math.round((forecast.main.temp - 273.15) * 9 / 5 + 32);
                const weatherIcon = forecast.weather[0].icon;
                const wind = forecast.wind.speed;
                const humidity = forecast.main.humidity;

                // Append the content onto page
                fiveDayDate.textContent = temp;
                weatherIconElement.textContent = weatherIcon;
                fiveDayTemp.textContent = temp;
                fiveDayWind.textContent = wind;
                fiveDayHumidity.textContent = humidity;
            });
        })
        .catch(error => {
            console.log('An error occurred', error);
        });
}
fetchFiveDay('Tampa')


// Function: Display Search History
// Loop over the History Array & count down so most recent serach is at the top


// Function: Update the search history in local storage

// Function: Get the search history in local storage

// Function: Get the current weather data from fetch request

// Function: Display 5 day forecast data from fetch request
// need icon, temp, humidity, date, wind speed

// Create elements for each of the above

// Function: Display 5 day forecast data frmoo fetch request for each card

// Function: Specifically for geolocation with latitude & longitude and use function above to make calls here - callback function in here

// Function: Event listener for search butttoine
