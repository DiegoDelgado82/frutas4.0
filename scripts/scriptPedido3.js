document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const latitude = -31.4201; // Latitud de Córdoba, Argentina
    const longitude = -64.1888; // Longitud de Córdoba, Argentina
    fetchWeather(latitude, longitude);
});
function fetchWeather(latitude, longitude) {
    const apiKey = "10219ce6e58c66e0ca235e8bee9c0684"; // Reemplaza esto con tu API key de Weather Unlocked
    const apiUrl = `http://api.weatherunlocked.com/api/current/${latitude},${longitude}?app_id=27e06e67&app_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Ha ocurrido un error:", error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    if (data.error) {
        weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
    } else {
        const temperatureCelsius = data.temp_c;
        const temperatureFahrenheit = data.temp_f;
        const weatherDescription = data.wx_desc;

        weatherInfo.innerHTML = `
            <p>Temperatura: ${temperatureCelsius}°C / ${temperatureFahrenheit}°F</p>
            <p>Descripción: ${weatherDescription}</p>
        `;
    }
}
