
function loadWeatherData(city) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d493fdf9dabb2c2a8d6f2e1917f28438&units=metric',
        method: 'GET',
        success: function(response) {
            var currentTime = new Date(response.dt * 1000);
            var currentTimeString = currentTime.toLocaleTimeString();
            $('#myTable tbody').append(`
                <tr>
                    <td>${response.name}</td>
                    <td>${currentTimeString}</td>
                    <td>${response.main.temp}</td>
                    <td>${response.weather[0].main}</td>
                </tr>
            `);
        },
        error: function(xhr, status, error) {
            console.error(status, error);
        }
    });
}

function loadForecast(city) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=d493fdf9dabb2c2a8d6f2e1917f28438&units=metric',
        method: 'GET',
        success: function(response) {
            $('#forecastTable tbody').empty();
            response.list.forEach(function(forecastData) {
                $('#forecastTable tbody').append(`
                    <tr>
                        <td>${response.city.name}</td>
                        <td>${forecastData.dt_txt}</td>
                        <td>${forecastData.main.temp}</td>
                        <td>${forecastData.weather[0].description}</td>
                    </tr>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error(status, error);
        }
    });
}
function darkTheme() {
        
    theme = "dark"
    document.getElementById("all").style.backgroundColor = "black"
    var headings = document.getElementsByTagName("h2");
    headings[0].style.color = "silver";
    headings[1].style.color = "silver";
    headings[2].style.color = "silver";   
    document.getElementById("about").style.color = "silver"
  
}

function lightTheme() {

    theme = "light"
    document.getElementById("all").style.backgroundColor = "white"
    var headings = document.getElementsByTagName("h2");
    headings[0].style.color = "black";
    headings[1].style.color = "black";
    headings[2].style.color = "black";   
    document.getElementById("about").style.color = "black"

}