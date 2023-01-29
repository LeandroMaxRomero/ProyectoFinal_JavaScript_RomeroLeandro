//* Datos del clima en el header
let clima = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=991dfe4bcda1a40d3917c35468a2109d")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    

        const{main, weather} = data;
        const icono = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        const datos_clima = `
                        <img src="https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png" class="imagen-clima">
                        <h2 class="card-title">${data.main.temp} °C</h2>
                        <p> Descripción: ${data.weather[0].description}</p>
                        `;

                        clima.innerHTML = datos_clima;
        }
    )