// var lat = 44.98;
// var lon = -93.25;

// function weatherData() {
// //     fetch('https://api.openweathermap.org/data/2.5/onecall?'


    
// //    + 'lat=' + JSON.stringify(lat)
// //    + '&lon=' + JSON.stringify(lon)

  
// //    + '&appid=a278107ddd3948f0d3f900ddd0dc1432')




// fetch('api.openweathermap.org/data/2.5/weather?zip=55109,us&appid='

// + '&appid=a278107ddd3948f0d3f900ddd0dc1432')

//     .this(response => response.json())
//     .this(response => console.log(response.data))
// };

// weatherData();



// Minneapolis, Minnesota



function weatherSearch() {

var searchCity = document.querySelector('#search-city').value.trim();

fetch('https://api.openweathermap.org/data/2.5/weather?q='

+ searchCity
//+ 'Minneapolis, Minnesota'

+ '&appid=a278107ddd3948f0d3f900ddd0dc1432')
.then(response => response.json())
.then(response => console.log(response))

};


weatherSearch();

function searchButtonHandler() {

    

$('button#search').onclick(weatherSearch())

}

//button click
// value of button passed into weatherSearch para