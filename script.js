async function getWeather() {
    const apiKey = "ae89f5d5d957a420fa09fa09c395b055";
    const city = document.getElementById("cityInput").value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherDescription = data.weather[0].description.toLowerCase();
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            // Изменяем фон в зависимости от описания погоды
            changeBackground(weatherDescription);

            document.getElementById("weatherOutput").innerHTML = `
                <h3>Погода в ${city}</h3>
                <p>Описание: ${weatherDescription}</p>
                <p>Температура: ${temperature}°C</p>
                <p>Скорость ветра: ${windSpeed} м/с</p>
            `;
        } else {
            document.getElementById("weatherOutput").innerHTML = "<p>Город не найден. Попробуйте снова.</p>";
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
        document.getElementById("weatherOutput").innerHTML = "<p>Произошла ошибка. Попробуйте позже.</p>";
    }
}

// Функция для изменения фона
function changeBackground(description) {
    const body = document.body;
    
    if (description.includes("ясно")) {
        body.style.backgroundImage = "url('IMG_0716')"; // Замените 'sunny.jpg' на путь к изображению для солнечной погоды
    } else if (description.includes("снег")) {
        body.style.backgroundImage = "url('IMG_0715')"; // Замените 'snow.jpg' на путь к изображению для снега
    } else if (description.includes("дождь") || description.includes("дождливо")) {
        body.style.backgroundImage = "url('IMG_0717')"; // Замените 'rainy.jpg' на путь к изображению для дождя
    } else {
        body.style.backgroundImage = "url('IMG_0719')"; // Замените 'default.jpg' на изображение по умолчанию
    }

    // Стили для адаптации изображения фона
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
}
