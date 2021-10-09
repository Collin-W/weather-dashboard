var body = document.querySelector("body");
var dash = document.querySelector("#city-dash");
var dataArray = [];
var cityNameHistoryArray = JSON.parse(localStorage.getItem('city')) || [];


//accepts the location argument into the fetch function
function weatherSearch(location) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q='

           + location

           + '&appid=a278107ddd3948f0d3f900ddd0dc1432')

        .then(response => response.json())
        .then(response => {

            var cityName = location

            var dateTime = moment().format('MMMM Do YYYY');

            var kelvinData = response.main.temp;
            var humidityData = response.main.humidity;
            var pressureData = response.main.pressure;
            var windSpeedData = response.wind.speed;
            var iconData = response.weather[0].main.toLowerCase();

            // convert kelvin temp int to fahrenheit temp int
            var kelvinToFahrenheit = ((kelvinData - 273.15) * 9 / 5 + 32);
            var fahrenheitTemp = Math.round(kelvinToFahrenheit);

            renderWeatherSearch(cityName, dateTime, fahrenheitTemp, humidityData, pressureData, windSpeedData, iconData);
        });
};


var renderWeatherSearch = function (city, date,
    temp, humid, pres, wind, icon) {

    //render icons with if statements
    if (icon.startsWith("cloud") === true) {
        icon = "fas fa-cloud";
        //$("body").addClass('cloud')

    } else if (icon.startsWith("clear") === true) {
        icon = "fas fa-sun";
        //$("body").addClass('clear')

    } else if (icon.startsWith("rain") === true) {
        icon = "fas fa-cloud-showers-heavy";
        //$("body").addClass('rain')

    } else if (icon.startsWith("mist") === true) {
        icon = "fas fa-smog";
        //$("body").addClass('fog')

    } else if (icon.startsWith("snow") === true) {
        icon = "far fa-snowflake";
        //$("body").addClass('snow')

    } else if (icon.startsWith("partly") === true) {
        icon = "fas fa-cloud-sun";
        //$("body").addClass('cloud')


    } else if (icon.startsWith("fog") === true) {
        icon = "fas fa-smog";
        //$("body").addClass('fog')

    } else {
        //$("body").addClass('else')
    };

    //renders information to the dashboard
    var cityName = document.createElement('p');
    cityName.setAttribute("id", "");
    cityName.setAttribute("class", "city-name");
    cityName.textContent = "" + city + "";
    dash.appendChild(cityName);

    var dateTime = document.createElement('p');
    dateTime.setAttribute("id", "");
    dateTime.setAttribute("class", "dash");
    dateTime.textContent = date;
    dash.appendChild(dateTime);

    var cityTemp = document.createElement('p');
    cityTemp.setAttribute("id", "city-temp");
    cityTemp.setAttribute("class", "dash");
    cityTemp.textContent = "Temp: " + temp + "°F";
    dash.appendChild(cityTemp);

    var cityHumidity = document.createElement('p');
    cityHumidity.setAttribute("id", "");
    cityHumidity.setAttribute("class", "dash");
    cityHumidity.textContent = "Humidity: " + humid + "%";
    dash.appendChild(cityHumidity);

    var cityPressure = document.createElement('p');
    cityPressure.setAttribute("id", "");
    cityPressure.setAttribute("class", "dash");
    cityPressure.textContent = "Pressure: " + pres + "mb";
    dash.appendChild(cityPressure);

    var cityWind = document.createElement('p');
    cityWind.setAttribute("id", "");
    cityWind.setAttribute("class", "dash");
    cityWind.textContent = "Wind: " + wind + "mph";
    dash.appendChild(cityWind);

    var iconLogo = document.createElement('i');
    var h1Tag = document.createElement('h1');
    h1Tag.setAttribute("class", "dash");
    iconLogo.setAttribute("class", icon);
    iconLogo.setAttribute("id", "");
    dash.appendChild(h1Tag);
    h1Tag.appendChild(iconLogo);
    //console.log(dash.appendChild(iconLogo));
};

// this is a secound api for the forecasted weather 
function forecastWeatherCards(location) {

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='

           + location

           + '&appid=a278107ddd3948f0d3f900ddd0dc1432')

        .then(response => response.json())
        .then(response => {

            var list = response.list;
            console.log(list)

            for (var i = 0; i < list.length; i++) {

                if (list[i].dt_txt.endsWith('12:00:00')) {
                    //console.log(list[i].dt_txt);

                    var date = list[i].dt_txt
                    var temp = list[i].main.temp
                    var humidity = list[i].main.humidity
                    var pressure = list[i].main.pressure
                    var wind = list[i].wind.speed
                    var icon = list[i].weather.icon

                    var dataObject = {
                        'date': date,
                        'temp': temp,
                        'humidity': humidity,
                        'pressure': pressure,
                        'wind': wind,
                        'icon': icon
                    };
                    dataArray.push(dataObject);
                };
            };
            renderForecastCards(dataArray)
        });
};

// this renders the forecast cards while looping to an addtional card
function renderForecastCards(dataArray) {
    console.log(dataArray);

    for (var i = 0; i < dataArray.length; i++) {

        var cardDate = document.createElement('p');
        cardDate.setAttribute("id", "");
        cardDate.setAttribute("class", "forecast-card");
        cardDate.textContent = "Forecast for: " + dataArray[i].date + "pm";
        $('#' + i).append(cardDate);

        var cardKelvinTemp = ((dataArray[i].temp - 273.15) * 9 / 5 + 32);
        var cardFahrenheitTemp = Math.round(cardKelvinTemp);
       // console.log(cardFahrenheitTemp)
        var cardTemp = document.createElement('p');
        cardTemp.setAttribute("id", "")
        cardTemp.setAttribute("class", "forecast-card")
        cardTemp.textContent = "Temp: " + cardFahrenheitTemp + "ºF";
        $('#' + i).append(cardTemp);

        var cardHumidity = document.createElement('p');
        cardHumidity.setAttribute("class", "forecast-card");
        cardHumidity.textContent = "Humidity: " + dataArray[i].humidity + "%";
        $('#' + i).append(cardHumidity);

        var cardPressure = document.createElement('p');
        cardPressure.setAttribute("class", "forecast-card");
        cardPressure.textContent = "Pressure: " + dataArray[i].pressure + "mb";
        $('#' + i).append(cardPressure);

        var cardWind = document.createElement('p');
        cardWind.setAttribute("class", "forecast-card");
        cardWind.textContent = "Wind: " + dataArray[i].wind + "mph";
        $('#' + i).append(cardWind);

        var cardIcon = document.createElement('i');
        cardIcon.setAttribute("class", "forecast-card");
        cardIcon.textContent = dataArray[i].icon;
        $('#' + i).append(cardIcon);
    }
}

// when a user searches for a city, a new button is created and saved to local storage
function citySearchStorage(location) {

    var addedToArray = location;
    cityNameHistoryArray.push(addedToArray);
    localStorage.setItem('city', JSON.stringify(cityNameHistoryArray));
   // newCityButton(storedArray)
   newCityButton()
}

// this makes a new button for items saved to local storage
function newCityButton() {

    for(var i = 0; i < cityNameHistoryArray.length; i++) {

        var newBtn = document.createElement('button');
        newBtn.setAttribute('class', 'city-btn col-12');
        newBtn.setAttribute('value', cityNameHistoryArray[i]);
        newBtn.textContent = cityNameHistoryArray
        $('#btnHolder').append(newBtn);
    }
}

//Listens for the search button click, then sends the value of the search textarea to the weatherSearch function
$('#search').click(function () {
    var searchCity = document.querySelector('#search-city').value.trim();
    weatherSearch(searchCity);
    forecastWeatherCards(searchCity);
    citySearchStorage(searchCity);
});


// listens for all button clicks
$('button').click(function () {
    var btnValue = $(this).attr('value');
    dataArray = [];
    $('#card-container').show();
    $('#search-city').val('');
    $("#city-dash").empty();
    $('.forecast-card').empty();
    weatherSearch(btnValue);
    forecastWeatherCards(btnValue);
});

$('#card-container').hide();


 //+ 'Minneapolis, Minnesota'

// var = document.createElement('p');
//    .setAttribute("id", "")
//    .setAttribute("class", "")
//    .textContent= "" + + "";
//    dash.appendChild();
