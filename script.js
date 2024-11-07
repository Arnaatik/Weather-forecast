async function getWeather() {
    const apiKey = "70dcb7411a83366ebc45c6cdfd11ae15"; // Замените на ваш API-ключ
    const city = document.getElementById("cityInput").value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            document.getElementById("weatherOutput").innerHTML = `
                <h3>Погода в ${city}</h3>
                <p>Описание: ${weather}</p>
                <p>Температура: ${temperature}°C</p>
                <p>Скорость ветра: ${windSpeed} м/с</p>
            `;
        } else {
            document.getElementById("weatherOutput").innerHTML = "<p>Город не найден. Попробуйте снова.</p>";
        }
    } catch (error) {
        document.getElementById("weatherOutput").innerHTML = "<p>Произошла ошибка. Попробуйте снова позже.</p>";
    }
}
