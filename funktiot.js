document.addEventListener("DOMContentLoaded", function() {
    // Kutsutaan lightTheme-funktiota sivun latauksen jälkeen
    lightTheme();
});

 
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
            if (xhr.status === 404) {
                alert('Kaupunkia ei löytynyt, yritä uudelleen.');
            } else {
                console.error(status, error);
            }
        }
    });
}


function loadForecast(city) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=d493fdf9dabb2c2a8d6f2e1917f28438&units=metric',
        method: 'GET',
        success: function(response) {
            $('#forecastTable tbody').empty();
            var forecasts = response.list.slice(0, 10);
            forecasts.forEach(function(forecastData) {
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
            if (xhr.status === 404) {
                alert('Kaupunkia ei löytynyt, yritä uudelleen.');
            } else {
                console.error(status, error);
            }
           
        }
        
    });
}


function lightTheme() {
    // taustakuva vaalea teema
    var lightThemeImage = "images/taivasVaalea.jpg";            //Image taivasVaalea
    var headings = document.getElementsByTagName("h1");
    headings[0].style.color = "black";
    headings[1].style.color = "black";
    document.getElementById("pageBackground").style.backgroundImage = "url('" + lightThemeImage + "')";
}


function darkTheme() {
    //  taustakuva tumma teema
    var darkThemeImage = "images/Yötaivas2.jpg";              //Image Yötaivas2 
    var headings = document.getElementsByTagName("h1");
    headings[0].style.color = "silver";
    headings[1].style.color = "silver";
    document.getElementById("pageBackground").style.backgroundImage = "url('" + darkThemeImage + "')";
}


function searchWeather() {
    // tyhjentää edellisen haun datan
    $('#myTable tbody').empty();

// -----------Virheenhallintaa---------
    // Hae kaupungin nimi syötekentästä
    var city = document.getElementById('cityInput').value;

    // Tarkistaa, onko syöte tyhjä
    if (city.trim() === '') {
        alert('Syötä kaupungin nimi');
        return; // Lopeta toiminto, jos syöte on tyhjä
    }


    // Hae säätiedot, jos syöte on kelvollinen
    else
    loadWeatherData(city);
}


function searchForecast() {
    $('#myTable tbody').empty();
    var city = document.getElementById('forecastCityInput').value;
    if (city.trim() === '') {
        alert('Syötä kaupungin nimi');
        return; // Lopeta toiminto, jos syöte on tyhjä
    }
    loadForecast(city);
}


// Tyhjennä syötekenttä ja taulu
function clearInputAndTable() {
    document.getElementById('cityInput').value = '';    
    $('#myTable tbody').empty();
}

// Tyhjennä syötekenttä ja taulu
function clearWeatherInputAndTable() {
    document.getElementById('forecastCityInput').value = ''; 
    $('#forecastTable tbody').empty();
}




