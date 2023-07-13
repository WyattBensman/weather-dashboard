// Three Global Variables
// 1 for the API Key [Paste Key into this]
// 1 for the Base URL which is the Https:.com
// Search History Array
let apiKey = '8991a5a08a579f8f779c2c15d485fec3';
let baseURL = 'https://api.openweathermap.org/data/2.5'
let history = [];

// Elements
let searchedCity = document.querySelector('#searchedCity')
let userForm = document.querySelector('.userForm')

// Grab the User Input
let formSubmitHandler = (e) => {
    e.preventDefault();

    let city = searchedCity.value.trim();
    console.log(city);
}

userForm.addEventListener('submit', formSubmitHandler);

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
