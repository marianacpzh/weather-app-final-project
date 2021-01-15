//todaysDate(realTime)

function realTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

//currentCitytodaysTemperature

function showTemperature(response) {
  let currentCity = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#weatherDescriptionMain");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let temMinElement = document.querySelector("#todaysTemperatureMin");
  let temMAxElement = document.querySelector("#todaysTemperatureMax");
  //icon
  let iconElement = document.querySelector("#mainTodaysIcon");
  let listIconElement = document.querySelector("#TodaysIcon");
  //date
  let dateElement = document.querySelector("#todaysDate");
  dateElement.innerHTML = realTime(response);
  //Day
  let dayElement = document.querySelector("#todayDay");
  dayElement.innerHTML = formatDay(response.data.dt * 1000);

  // fahrenheit&celsius
  celsiusTemperature = response.data.main.temp;

  let h2 = document.querySelector("h2");
  h2.innerHTML = currentTemperature;

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  temMinElement.innerHTML = Math.round(response.data.main.temp_min);
  temMAxElement.innerHTML = Math.round(response.data.main.temp_max);

  let message = `${currentCity}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;

  //icon
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //
  listIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  listIconElement.setAttribute("alt", response.data.weather[0].description);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f8b7ad76a785b871420ccfec88454d02";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  //forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalycurrentCitytForecast);
}

navigator.geolocation.getCurrentPosition(handlePosition);

//searchCitybutton `https://api.openweathermap.org/data/2.5/onecall??q=Madrir&exclude=daily&appid=f8b7ad76a785b871420ccfec88454d02&units=metric`;

//searchCitybuttonDate

function formatDate(timestamp) {
  return `Last updated ${formatDay(timestamp)} ${formatHours(timestamp)}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//searchCitybuttonTemperature

function changeShowTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let newCity = response.data.name;
  let descriptionElement = document.querySelector("#weatherDescriptionMain");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#todaysDate");
  let temMinElement = document.querySelector("#todaysTemperatureMin");
  let temMAxElement = document.querySelector("#todaysTemperatureMax");
  //icon
  let iconElement = document.querySelector("#mainTodaysIcon");
  let listIconElement = document.querySelector("#TodaysIcon");

  //Day
  let dayElement = document.querySelector("#todayDay");
  dayElement.innerHTML = formatDay(response.data.dt * 1000);

  // fahrenheit&celsius
  celsiusTemperature = response.data.main.temp;

  let h2 = document.querySelector("h2");
  h2.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temMinElement.innerHTML = Math.round(response.data.main.temp_min);
  temMAxElement.innerHTML = Math.round(response.data.main.temp_max);
  let message = `${newCity}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;
  //icon
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //
  listIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  listIconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "f8b7ad76a785b871420ccfec88454d02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeShowTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#text-input");
  search(cityInputElement.value);
}

let changeCity = document.querySelector("#searchCity");
changeCity.addEventListener("submit", handleSubmit);

//currentCitytforecast

function dispalycurrentCitytForecast(response) {
  //todaysPlusOne
  let temMinElement = document.querySelector("#todaysPlusOneTemperatureMin");
  let temMAxElement = document.querySelector("#todaysPlusOneTemperatureMax");
  temMinElement.innerHTML = Math.round(response.data.daily[1].temp.min);
  temMAxElement.innerHTML = Math.round(response.data.daily[1].temp.max);

  let dateElement = document.querySelector("#todayPlusOne");
  dateElement.innerHTML = formatDay(response.data.daily[1].dt * 1000);
  //icon
  let listiconElement = document.querySelector("#todayPlusOneIcon");

  listiconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`
  );

  //todaysPlusTwo

  let temMinElementPlusTwo = document.querySelector(
    "#todaysPlusTwoTemperatureMin"
  );
  let temMAxElementPlusTwo = document.querySelector(
    "#todaysPlusTwoTemperatureMax"
  );
  temMinElementPlusTwo.innerHTML = Math.round(response.data.daily[2].temp.min);
  temMAxElementPlusTwo.innerHTML = Math.round(response.data.daily[2].temp.max);

  let dateElementPlusTwo = document.querySelector("#todayPlusTwo");
  dateElementPlusTwo.innerHTML = formatDay(response.data.daily[2].dt * 1000);
  //icon
  let iconElementPlusTwo = document.querySelector("#todayPlusTwoIcon");

  iconElementPlusTwo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`
  );
  iconElementPlusTwo.setAttribute(
    "alt",
    response.data.daily[2].weather[0].description
  );

  //todaysPlusthree
  let temMinElementPlusThree = document.querySelector(
    "#todaysPlusThreeTemperatureMin"
  );
  let temMAxElementPlusThree = document.querySelector(
    "#todaysPlusThreeTemperatureMax"
  );
  temMinElementPlusThree.innerHTML = Math.round(
    response.data.daily[3].temp.min
  );
  temMAxElementPlusThree.innerHTML = Math.round(
    response.data.daily[3].temp.max
  );

  let dateElementPlusThree = document.querySelector("#todayPlusThree");
  dateElementPlusThree.innerHTML = formatDay(response.data.daily[3].dt * 1000);
  //icon
  let iconElementPlusThree = document.querySelector("#todayPlusThreeIcon");

  iconElementPlusThree.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`
  );
  iconElementPlusThree.setAttribute(
    "alt",
    response.data.daily[3].weather[0].description
  );
}

//searchCitytforecast
function dispalyForecast(response) {
  //todays
  let temMinElement = document.querySelector("#todaysTemperatureMin");
  let temMAxElement = document.querySelector("#todaysTemperatureMax");
  temMinElement.innerHTML = Math.round(response.data.list[0].main.temp_min);
  temMAxElement.innerHTML = Math.round(response.data.list[0].main.temp_max);

  let dateElement = document.querySelector("#todayDay");
  dateElement.innerHTML = formatHours(response.data.list[0].dt * 1000);
  //icon
  let iconElement = document.querySelector("#TodaysIcon");

  //todaysPlusOne
  let temMinElementPlusOne = document.querySelector(
    "#todaysPlusOneTemperatureMin"
  );
  let temMAxElementPlusOne = document.querySelector(
    "#todaysPlusOneTemperatureMax"
  );
  temMinElementPlusOne.innerHTML = Math.round(
    response.data.list[1].main.temp_min
  );
  temMAxElementPlusOne.innerHTML = Math.round(
    response.data.list[1].main.temp_max
  );

  let dateElementPlusOne = document.querySelector("#todayPlusOne");
  dateElementPlusOne.innerHTML = formatHours(response.data.list[1].dt * 1000);
  //icon
  let iconElementPlusOne = document.querySelector("#todayPlusOneIcon");

  iconElementPlusOne.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`
  );
  iconElementPlusOne.setAttribute(
    "alt",
    response.data.list[1].weather[0].description
  );

  //todaysPlusTwo
  let temMinElementPlusTwo = document.querySelector(
    "#todaysPlusTwoTemperatureMin"
  );
  let temMAxElementPlusTwo = document.querySelector(
    "#todaysPlusTwoTemperatureMax"
  );
  temMinElementPlusTwo.innerHTML = Math.round(
    response.data.list[2].main.temp_min
  );
  temMAxElementPlusTwo.innerHTML = Math.round(
    response.data.list[2].main.temp_max
  );

  let dateElementPlusTwo = document.querySelector("#todayPlusTwo");
  dateElementPlusTwo.innerHTML = formatHours(response.data.list[2].dt * 1000);
  //icon
  let iconElementPlusTwo = document.querySelector("#todayPlusTwoIcon");

  iconElementPlusTwo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`
  );
  iconElementPlusTwo.setAttribute(
    "alt",
    response.data.list[2].weather[0].description
  );

  //todaysPlusThree
  let temMinElementPlusThree = document.querySelector(
    "#todaysPlusThreeTemperatureMin"
  );
  let temMAxElementPlusThree = document.querySelector(
    "#todaysPlusThreeTemperatureMax"
  );
  temMinElementPlusThree.innerHTML = Math.round(
    response.data.list[3].main.temp_min
  );
  temMAxElementPlusThree.innerHTML = Math.round(
    response.data.list[3].main.temp_max
  );

  let dateElementPlusThree = document.querySelector("#todayPlusThree");
  dateElementPlusThree.innerHTML = formatHours(response.data.list[3].dt * 1000);
  //icon
  let iconElementPlusThree = document.querySelector("#todayPlusThreeIcon");

  iconElementPlusThree.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`
  );
  iconElementPlusThree.setAttribute(
    "alt",
    response.data.list[3].weather[0].description
  );
}
// fahrenheit&celsius

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Search on load
search("New York");
