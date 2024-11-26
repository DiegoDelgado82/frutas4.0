let fecha = new Date();
let dia = fecha.getDate() + 1;

// Función para verificar si se ha seleccionado algún artículo
function verificarPedido() {
    console.log(document.getElementById("selectProveedores").value)
    const selectProveedores = document.getElementById("selectProveedores");
    const enviarPedidoBtn = document.getElementById("enviarPedidoBtn");
    enviarPedidoBtn.disabled = selectProveedores.value === "Seleccionar Proveedor";
}

// Agregar evento al cargar el DOM
document.addEventListener("DOMContentLoaded", function() {
    console.log("Aquí")
    const latitude = -31.4201; // Latitud de Córdoba, Argentina
    const longitude = -64.1888; // Longitud de Córdoba, Argentina
    fetchCurrentTemperature(latitude, longitude);
    verificarPedido(); // Verificar el estado del pedido al cargar el DOM
});

// Agregar evento al cambio en el elemento de selección de proveedores
document.getElementById("selectProveedores").addEventListener("change", function() {
    verificarPedido(); // Verificar el estado del pedido al cambiar la selección
});

document.getElementById("btnPronostico").addEventListener("click", function(event) {
    event.preventDefault();
    const tomorrow = new Date(); // Obtener la fecha actual
    tomorrow.setDate(tomorrow.getDate() + 1); // Añadir un día para obtener el día siguiente
    const latitude = -31.4201; // Latitud de Córdoba, Argentina
    const longitude = -64.1888; // Longitud de Córdoba, Argentina
    fetchWeather(latitude, longitude, tomorrow);
});

function fetchWeather(latitude, longitude, date) {
    const apiKey = "a76633b58f7043fdcfff85185e7c796a"; // Tu API key de OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherModal(data, date);
        })
        .catch(error => {
            console.error("Ha ocurrido un error:", error);
        });
}

function fetchCurrentTemperature(latitude, longitude) {
    const apiKey = "a76633b58f7043fdcfff85185e7c796a"; // Tu API key de OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentTemperatureBtn(data);
        })
        .catch(error => {
            console.error("Ha ocurrido un error:", error);
        });
}

function displayCurrentTemperatureBtn(data) {
    const currentTemperatureBtnElement = document.getElementById("currentTemperatureBtn");
    const temperature = Math.round(data.main.temp);
    currentTemperatureBtnElement.innerHTML = `
        <div class="row">
            <div class="col-md-6 col-6 fw-bold" style="font-size: 2rem;">${temperature}°</div>
            <div class="col-md-5 col-5">
            <!--     <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon" class="weather-icon" style="max-width: 250%; height: auto;">
            
         -->
         </div>
    
        </div>
    `;
}


function displayWeatherModal(data, date) {
    const modalBody = document.getElementById("weatherForecast");
    modalBody.innerHTML = "";

    const forecast = data.list.filter(day => {
        const dayDate = new Date(day.dt * 1000);
        return dayDate.getDate() == date.getDate(); // Filtrar por la fecha seleccionada
    });
   
    forecast.forEach((day, index) => {
        if (index < 3) { // Mostrar solo los próximos 3 días
            const dayDate = new Date(day.dt * 1000);
            const month = dayDate.toLocaleDateString("es-AR", { month: "long" });
            const temperatureMin = day.main.temp_min;
            const temperatureMax = day.main.temp_max;
            const weatherIcon = day.weather[0].icon; // Obtener el código de icono del clima
            const weatherDescription = day.weather[0].description;
            
            const weatherCard = `
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${dia} de ${month}</h5>
                            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}">
                            <p class="card-text">${Math.round(temperatureMin)}°C / ${Math.round(temperatureMax)}°C</p>
                        </div>
                    </div>
                </div>
            `;
            modalBody.innerHTML += weatherCard;
            dia++;
        }
    });

    $('#weatherModal').modal('show');
    dia = fecha.getDate() + 1;
}
