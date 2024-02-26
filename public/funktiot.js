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
            var temperature = Math.round(response.main.temp);
            $('#myTable tbody').append(`
                <tr>
                    <td>${response.name}</td>
                    <td>${currentTimeString}</td>
                    <td>${temperature}</td>
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
            var forecasts = response.list.slice(0,30);
            forecasts.forEach(function(forecastData) {
                var temperature = Math.round(forecastData.main.temp);
                $('#forecastTable tbody').append(`
                    <tr>
                        <td>${response.city.name}</td>
                        <td>${forecastData.dt_txt}</td>
                        <td>${temperature}</td>
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

//---------------DOM päivitys--------------------//
function lisaaAboutOsa() {
    
    var aboutDiv = document.createElement('div');
    aboutDiv.className = 'container';
    aboutDiv.id = 'about';

    
    var title = document.createElement('h1');
    title.textContent = 'Tietoja sovelluksesta';

    var info1 = document.createElement('h3');
    info1.innerHTML = '<strong>Tällä sivulla näkyvät avoimen datan sovellusliittymästä haetut säätiedot.</strong>';

    var info2 = document.createElement('h3');
    info2.innerHTML = '<strong>Tiedot haetaan sääsovellusliittymästä osoitteesta <a href="https://openweathermap.org/" class="text-decoration-none">https://openweathermap.org/</a></strong>';

    var info3 = document.createElement('h3');
    info3.textContent = 'Näytettävät tiedot sisältävät eri kaupunkien lämpötila- ja sääolosuhteet.';

    // Lisää sisällöt aboutDiv-elementtiin
    aboutDiv.appendChild(title);
    aboutDiv.appendChild(info1);
    aboutDiv.appendChild(info2);
    aboutDiv.appendChild(info3);

    
    var targetElement = document.getElementById('Tietoja'); 

   
    targetElement.parentNode.insertBefore(aboutDiv, targetElement.nextSibling);
}

// Alusta muuttuja nykyisen teeman tilalle
// var currentTheme = 'light'; // Oletusarvo on vaalea teema

function lightTheme() {
    // taustakuva vaalea teema
    var lightThemeImage = "images/taivasVaalea.jpg";            //Image taivasVaalea
    var headings = document.getElementsByTagName("h1");
    headings[0].style.color = "black";
    headings[1].style.color = "black";
    document.getElementById("pageBackground").style.backgroundImage = "url('" + lightThemeImage + "')";

    // Muuta Tietoja-osion tyyliä vaalean teeman mukaan
    //var aboutElement = document.getElementById("about");
    // aboutElement.style.backgroundColor = "#f8f9fa"; // Vaalean teeman taustaväri
    //aboutElement.style.color = "black"; // Vaalean teeman tekstiväri
}

function darkTheme() {
    //  taustakuva tumma teema
    var darkThemeImage = "images/Yötaivas2.jpg";              //Image Yötaivas2 
    var headings = document.getElementsByTagName("h1");
    headings[0].style.color = "silver";
    headings[1].style.color = "silver";
    document.getElementById("pageBackground").style.backgroundImage = "url('" + darkThemeImage + "')";

    // Muuta Tietoja-osion tyyliä tumman teeman mukaan
    //var aboutElement = document.getElementById("about");
    // aboutElement.style.backgroundColor = "#343a40"; // Tumman teeman taustaväri
    // aboutElement.style.color = "white"; // Tumman teeman tekstiväri
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


    // Hakee säätiedot, jos syöte on kelvollinen
    else
    loadWeatherData(city);
}


function searchForecast() {
    $('#myTable tbody').empty();
    var city = document.getElementById('forecastCityInput').value;
    if (city.trim() === '') {
        alert('Syötä kaupungin nimi');
        return; // Lopettaa toiminnon, jos syöte on tyhjä
    }
    loadForecast(city);
}

//-----------------Kenttien tyhjennys-----------------//

function clearInputAndTable() {
    document.getElementById('cityInput').value = '';    
    $('#myTable tbody').empty();
}


function clearWeatherInputAndTable() {
    document.getElementById('forecastCityInput').value = ''; 
    $('#forecastTable tbody').empty();
}

















