const axios = require('axios')

const urlBody = 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=ms&timeformat=unixtime'

module.exports={getWeatherData,parseCurrentWeather,parseDailyWeather,parseHourlyWeather}

function getWeatherData(lat, long,timezone) {
    return axios.get(urlBody, { params: { latitude: lat, longitude: long,timezone} })
        .then(({data})=>{
            return {
                current:parseCurrentWeather(data.current_weather,data.daily),
                daily:parseDailyWeather(data.daily),
                hourly:parseHourlyWeather(data.hourly,data.current_weather)
            }
        })
}

function parseCurrentWeather(current_weather, daily) {
    const { temperature: currentTemp, windspeed: wind, weathercode: weatherCode } = current_weather;
    const {
      temperature_2m_max: [maxTemp],
      temperature_2m_min: [minTemp],
      apparent_temperature_max: [maxFeelsLike],
      apparent_temperature_min: [minFeelsLow],
      precipitation_sum: [precip],
    } = daily;
      return {
      currentTemp: Math.round(currentTemp),
      weatherCode,
      highTemp: Math.round(maxTemp),
      lowTemp: Math.round(minTemp),
      feelsHigh: Math.round(maxFeelsLike),
      feelsLow: Math.round(minFeelsLow),
      wind: Math.round(wind),
      precipitation: Math.round(precip),
    };
  }
  

function parseDailyWeather(daily){
    return daily.time.map((time,index)=>{
        return {
            timeStamp:time*1000,
            temperature:Math.round(daily.temperature_2m_max[index]),
            weatherCode:daily.weathercode[index],
            day:index,
        }
    })
}

function parseHourlyWeather(hourly,current_weather){
    const currentTime=current_weather.time;
    const modifiedHourly=hourly.time.splice(hourly.time.indexOf(currentTime))
    return modifiedHourly.map((time,index)=>{
        return {
            timeStamp:time*1000,
            weatherCode:hourly.weathercode[index],
            temperature:Math.round(hourly.temperature_2m[index]),
            feelsHigh:Math.round(hourly.apparent_temperature[index]),
            precipitation:Math.round(hourly.precipitation_probability[index]),
            day:index,
            wind:Math.round(hourly.windspeed_10m[index]),
        }
    })
}