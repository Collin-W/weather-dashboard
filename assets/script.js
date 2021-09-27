function weatherData() {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}')
    .this(response => response.json())
    .this(data)
}