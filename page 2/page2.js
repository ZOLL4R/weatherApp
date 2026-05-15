
const apiKey = "1c00b9e23592f3ad146355b2947a41b7";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const SearchedCity = document.querySelector(".search-bar input");
const Search_btn = document.querySelector(".search-bar button");


                    //FONCTION TO CHECK THE WEATHER------------------------------------


async function checkWeather(NameCity) { 

    const weatherResponse = await fetch(apiURL + NameCity + `&appid=${apiKey}`);
    var data = await weatherResponse.json();

    if (Response.status == 404){
        document.querySelector(".errorsMSG").style.display = "block";
        document.querySelector(".weatherChart").style.display = "none";
    }else{
        document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".T").innerHTML = data.main.temp + '°C';
    document.querySelector(".H").innerHTML = data.main.humidity + '%';
    document.querySelector(".WS").innerHTML = data.wind.speed + ' Km/h';
    
    console.log(data);
    

                        //CHANGING THE IMAGES OF THE EQUIVALENT WEATHER ----------------------
    
    const weatherImg = document.querySelector(".WeatherImg");
    var weatherInfo = data.weather[0].main;
    switch (weatherInfo) {

    case "Clear":
        weatherImg.src ="image/sunny.png";
        break;
    
    case "Clouds":
        weatherImg.src ="image/cloud.png";
        break;
    
    case "Rain":
        weatherImg.src ="image/rain.png";
        break;

    case "Snow":
        weatherImg.src ="image/freeze.png";
        break;

    case "Drizzle":
        weatherImg.src ="image/drizzle.png";
        break;

    case "Thunderstorm":
        weatherImg.src ="image/sunny.png";
        break;

    case "Mist":
        weatherImg.src ="image/sunny.png";
        break;

}

    document.querySelector(".weatherChart").style.display = "block";
    }

    



}

                    // BUTTON --------------------------------------------


Search_btn.addEventListener("click", ()=>{
    checkWeather(SearchedCity.value);
})








