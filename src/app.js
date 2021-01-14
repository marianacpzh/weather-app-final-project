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
}

navigator.geolocation.getCurrentPosition(handlePosition);

//searchCitybutton

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
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#text-input");
  search(cityInputElement.value);
}

let changeCity = document.querySelector("#searchCity");
changeCity.addEventListener("submit", handleSubmit);

//Search on load
search("New York");

//forecast

//todayPlusOne

// todayPlusTwo
