
function loadWeatherData(city) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d493fdf9dabb2c2a8d6f2e1917f28438&units=metric',
        method: 'GET',
        success: function(response) {
            $('#myTable tbody').append(`
                <tr>
                    <td>${response.name}</td>
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