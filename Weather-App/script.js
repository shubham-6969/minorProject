const apiKey = "bcea81e0563f3c9a12448ffd55c8a8db";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon =document.querySelector(".weather-icon");

async function checkWeather(city = "Delhi") { // Default city set ki
  if (!city || city.trim() === "") {
    alert("Please enter a valid city name!");
    return;
  }

  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error(`City "${city}" not found. Please enter a valid city.`);
    }

    const data = await response.json();
    console.log(data);

    if (!data.main || !data.wind) {
      throw new Error("Invalid weather data received.");
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

if(data.weather[0].main =="Clouds"){
  weatherIcon.src = "Images/clouds.png"
} 
else if(data.weather[0].main =="Clear"){
  weatherIcon.src = "Images/clear.png"
} 
else if(data.weather[0].main =="Rain"){
  weatherIcon.src="Images/rain.png";
} 
else if(data.weather[0].main =="Drizzle"){
  weatherIcon.src = "Images/drizzle.png";
} 
else if(data.weather[0].main =="Mist"){
  weatherIcon.src = "Images/mist.png";
} 
else if(data.weather[0].main =="Snow"){
  weatherIcon.src = "Images/snow.png";
}

document.querySelector(".weather").style.display = "block"
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }

     
}

// Default city ka weather show kare on page load
// checkWeather(); 

// Search button click event
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim()); // Trim extra spaces
});


