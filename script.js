const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const free = document.querySelector(".free");

search.addEventListener('click', () => {

    const APIkey = "56da6a48fb88791dbb225dd420aff7b3";
    const city = document.querySelector('.search-box input').value;

    if (city === ''){
        free.classList.remove('passive');
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.remove('active');
        return;
    }
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&appid=${APIkey}`)
    .then( response => response.json())
    .then(json => { 

        if(json.cod == '404'){
            container.style.height = '450px';
            
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            free.classList.add('passive');
            return;
        }


        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
        free.classList.add('passive');

        //The &units=metric gives temp in celsius
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const wind = document.querySelector('.weather-details .wind span');
        const humidity = document.querySelector('.weather-details .humidity span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src= "clear.png";
                break;

            case 'Clouds':
                image.src= "cloud.png";
                break;
            
            case 'Rain':
                image.src= "rain.png";
                break;

            case 'Mist':
                image.src= "mist.png";
                break;
            
            case 'Snow':
                image.src= "snow.png";
                break;
            
            case 'Haze':
                image.src= "mist.png";
                break;

            default:
                image.src= "cloud.png";

        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}KM/H`;
    });
    
});