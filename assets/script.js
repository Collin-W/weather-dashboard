var dash = document.querySelector("#city-dash");
var counter = 0;
var dataArray = [];


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

    var iconData = response.weather[0].main.toLowerCase();
// change this 
    //var iconData = response.list[0].weather.main.toLowerCase();;
    console.log(iconData)
//


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

console.log(icon);



//render icons
   if(icon.startsWith("cloud") === true) {
       icon = "fas fa-cloud"

} else if(icon.startsWith("sun") === true) {
    icon = "far fa-snowflake"
    
 } else if(icon.startsWith("clear") === true) {
    icon = "fas fa-sun"

 
 } else if(icon.startsWith("rain") === true) {
    icon = "fas fa-cloud-showers-heavy"
    
 } else if(icon.startsWith("mist") === true) {
    icon = "fas fa-smog"
    
 } else if(icon.startsWith("snow") === true) {
    icon = "far fa-snowflake"
    
 } else if(icon.startsWith("partly") === true) {
    icon = "fas fa-cloud-sun"
    
} else {
    console.log("else");
};



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

   

   var iconLogo = document.createElement('i')
   var h1Tag = document.createElement('h1')
   iconLogo.setAttribute("class", icon )
   iconLogo.setAttribute("id", "logo")
//    iconLogo.setAttribute("aria-hidden", "true")

   dash.appendChild(h1Tag);
   h1Tag.appendChild(iconLogo);
   console.log(dash.appendChild(iconLogo));

//    var iconLogo =  iconLogo.innerHTML(icon)
//    //document.createElement('i');
//    //iconLogo.setAttribute("id", "")
  
//    iconLogo.setAttribute("aria-hidden", "true")
//    //icon.textContent= icon;
//    dash.appendChild(iconLogo);
};


// var = document.createElement('p');
//    .setAttribute("id", "")
//    .setAttribute("class", "")
//    .textContent= "" + + "";
//    dash.appendChild();

function forecastWeatherCards(location) {


    fetch('https://api.openweathermap.org/data/2.5/forecast?q='

    + location
    
    + '&appid=a278107ddd3948f0d3f900ddd0dc1432')
    
    .then(response => response.json())
    .then(response => {


        var list = response.list;
        console.log(list)


        // var newList = list.filter(date => list.dt_txt = list.dt_txt.includes('12:00:00'))
        // console.log(newList)


        for(var i = 0; i < list.length; i++) {

            if(list[i].dt_txt.endsWith('12:00:00')) {
                console.log(list[i].dt_txt);

       var date = list[i].dt_txt
       console.log(date)
       var temp = list[i].main.temp
       console.log(temp)
       var humidity = list[i].main.humidity
       var wind = list[i].wind.speed
       var icon = list[i].weather.icon
      
       
       
      var dataObject = {
        'date': date,
        'temp': temp
    };

    dataArray.push(dataObject);
    console.log(dataArray);




      

            };
        };
        renderForecastCards(dataArray)
    });
};



function renderForecastCards(dataArray) {

for(var i = 0; i < dataArray.length; i++) {

    var cardDate = document.createElement('p');
    //    cardDate.setAttribute("id", "")
    //    cardDate.setAttribute("class", "")
       cardDate.textContent = dataArray[i].date ;
       $('#' + i ).append(cardDate)
       //i.toString()
    //     var cardTemp = document.createElement('p');
    // //    .setAttribute("id", "")
    // //    .setAttribute("class", "")
    // cardTemp.textContent= temp;
}
}


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

forecastWeatherCards('Minneapolis');

// switch (icon) {


//     case "":
//         weatherIcon = '<h1 class="icon ml-5"><i class="weather-logo fas fa-cloud-sun"></i> Clouds</h1>`;
//         break;
        


// }