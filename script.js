const api = {
    key: "cd002205a3df349f22b4666afc63394a",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.searchbox');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
    if (evt.keyCode == 13) {  
        getResults(searchbox.value);
    }
}

function getResults (query) {
    
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
    return weather.json();
    }).then(displayResults);

}

function displayResults (weather) {

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.wdata .temp');
    temp.innerHTML = 'Temperature:  ' + `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherc = document.querySelector('.wdata .weather');
    weatherc.innerText = 'Weather Condition:    ' + weather.weather[0].description;

    let humidity = document.querySelector('.wdata .humidity');
    humidity.innerText = 'Humidity: ' + `${Math.round(weather.main.humidity)}%`;

    let windspeed = document.querySelector('.wdata .windspeed');
    windspeed.innerText = 'Wind Speed: ' + `${Math.round(3.6*weather.wind.speed)}km/hr`;

    let pressure = document.querySelector('.wdata .pressure');
    pressure.innerText = 'Atmospheric Pressure: ' + `${Math.round(weather.main.pressure)}hPa`;

}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}