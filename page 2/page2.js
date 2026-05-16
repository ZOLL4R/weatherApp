
const apiKey = "1c00b9e23592f3ad146355b2947a41b7";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const SearchedCity = document.querySelector(".search-bar input");
const Search_btn = document.querySelector(".search-bar button");

let cityTable = JSON.parse(localStorage.getItem("cities")) || []; 

                    //FONCTION TO CHECK THE WEATHER    ------------------------------------


async function checkWeather(NameCity) { 

   
    if (NameCity === "") return;

    try{
    const weatherResponse = await fetch(apiURL + NameCity + `&appid=${apiKey}`);

    const data = await weatherResponse.json();

    if (weatherResponse.status == 404){

        document.querySelector(".errorsMSG_Name").style.display = "block";
        document.querySelector(".weatherChart").style.display = "none";
        document.querySelector(".city").textContent = "ERROR";
        return;

    }else{

        document.querySelector(".errorsMSG_Name").style.display = "none";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".T").innerHTML = data.main.temp + '°C';
        document.querySelector(".H").innerHTML = data.main.humidity + '%';
        document.querySelector(".WS").innerHTML = data.wind.speed + ' Km/h';
        
        

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
            weatherImg.src ="image/sunny.png";  // Ba9i ml9itch chi we7din li zwinin b7ali UWU
            break;

        case "Mist":
            weatherImg.src ="image/sunny.png";  //hta hna
            break;

        }   

        document.querySelector(".weatherChart").style.display = "block";}

        const foundCity = cityTable.find(element => element === data.name);

        if (!foundCity){

            cityTable.push(data.name);
            localStorage.setItem("cities",JSON.stringify(cityTable));
            addToHistorique(NameCity);

        }  }catch(error){
            document.querySelector(".errorsMSG_Fetch").style.display = "block";
        }

        

}

 function addToHistorique(NameCity) {
    
        const $history = document.querySelector(".les_historiques");
        const $newHistory = document.createElement("li");
        const $k = document.createDocumentFragment();

        $newHistory.innerHTML = `${NameCity} <div class="controleBTN"><button class="up"><img src="image/up_arrow.png" alt="go up"></button>  <button class="down"><img src="image/down_arrow.png" alt="go down"></button>  <button class="delete"><img src="image/delete.png" alt="delete"></button></div>`;
        $k.append($newHistory);
        $history.append($k);
    } 

        


                    // BUTTON --------------------------------------------


Search_btn.addEventListener("click", ()=>{
    
    checkWeather(SearchedCity.value);


})

function goUp(){

}

function goDown(){

}

function obliterate(){

}




//--------------------Historique---------------------

cityTable.forEach(city => {
    addToHistorique(city);
});

