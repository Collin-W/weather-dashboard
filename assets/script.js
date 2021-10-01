var dash = document.querySelector("#city-dash")




//accepts the location argument into the fetch function, returning a temperature of location converted to fahrenheit
function weatherSearch(location) {

//var fetchURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + + '&appid=a278107ddd3948f0d3f900ddd0dc1432';
//https://api.openweathermap.org/data/2.5/weather?q=
fetch('https://api.openweathermap.org/data/2.5/weather?q='


//+ 'Minneapolis, Minnesota'
+ location

+ '&appid=a278107ddd3948f0d3f900ddd0dc1432')

.then(response => response.json())
.then(response => {


    var cityName = location

    var dateTime = moment().format('MMMM Do YYYY');
    console.log(dateTime);

    var kelvinData = response.main.temp;
    var humidityData = response.main.humidity;
    console.log(humidityData)
    var pressureData = response.main.pressure;
    console.log(pressureData)
    var windSpeedData = response.wind.speed;
    console.log(JSON.stringify(windSpeedData))
    var iconData = JSON.stringify(response.weather.description);
    console.log(iconData)

    var kelvinToFahrenheit = ((kelvinData - 273.15) * 9/5 + 32);
    // var test = System.out.printIn(kelvinToFahrenheit)
    // console.log(test)
    var fahrenheitTemp = Math.round(kelvinToFahrenheit);
    console.log(fahrenheitTemp);
    renderWeatherSearch(cityName, dateTime,
        fahrenheitTemp, humidityData, pressureData, windSpeedData, iconData);
        //currentData,

});
};


var renderWeatherSearch= function(city, date,
    temp, humid, pres, wind, icon) {


    var cityName = document.createElement('p');
    cityName.setAttribute("id", "")
    cityName.setAttribute("class", "")
    cityName.textContent= "" + city + "";
    dash.appendChild(cityName);

    var dateTime = document.createElement('p');
    dateTime.setAttribute("id", "");
    dateTime.setAttribute("class", "");
    dateTime.textContent= date;
    dash.appendChild(dateTime);

   var cityTemp = document.createElement('p');
   cityTemp.setAttribute("id", "city-temp");
   cityTemp.textContent= "Temp: " + temp + "°F";
   dash.appendChild(cityTemp);

   var cityHumidity = document.createElement('p');
   cityHumidity.setAttribute("id", "")
   cityHumidity.setAttribute("class", "")
   cityHumidity.textContent= "Humidity: " + humid + "%";
   dash.appendChild(cityHumidity);

   var cityPressure = document.createElement('p');
   cityPressure.setAttribute("id", "")
   cityPressure.setAttribute("class", "")
   cityPressure.textContent= "Pressure: " + pres + "mb";
   dash.appendChild(cityPressure);

   var cityWind = document.createElement('p');
   cityWind.setAttribute("id", "")
   cityWind.setAttribute("class", "")
   cityWind.textContent= "Wind: " + wind + "mph";
   dash.appendChild(cityWind);

   var icon = document.createElement('i');
   icon.setAttribute("id", "")
   icon.setAttribute("class", "far fa-cloud")
   icon.setAttribute("aria-hidden", "true")
   icon.textContent= icon;
   dash.appendChild(icon);
};


// var = document.createElement('p');
//    .setAttribute("id", "")
//    .setAttribute("class", "")
//    .textContent= "" + + "";
//    dash.appendChild();

function forecastWeatherCards(location) {


    fetch('https://api.openweathermap.org/data/2.5/weather?q='

    + location
    
    + '&appid=a278107ddd3948f0d3f900ddd0dc1432')
    
    .then(response => response.json())
    .then(response => {


        for(var i = 1; i <= 5; i++) {
       var temp = response.list[i].main.temp
       var humidity = response.list[i].main.humidity
       var date = response.list[i].dt_text
       var wind = response.list[i].wind.speed
       var icon = response.list[i].weather.icon
        };
    });
};

//Listens for the search button click, then sends the value of the search textarea to the weatherSearch function
$('#search').click(function(){
    var searchCity = document.querySelector('#search-city').value.trim();
    weatherSearch(searchCity);
    forecastWeatherCards(searchCity);
});

$('button').click(function() {
    var btnValue = $(this).attr('value');
    console.log(btnValue);
    weatherSearch(btnValue);
});

