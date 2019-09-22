import { DARK_SKY_KEY } from '../privateKeys';

/**
 * Get user geoposition
 * @returns {Object} User geoposition
 */
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

/**
 * Receives current weather from darksky.net
 * @returns {Object | Error} Object with weather data or error
 */
async function getWeather() {
  if (navigator.geolocation) {
    const position = await getPosition();
    const weatherPromise = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${position.coords.latitude},${position.coords.longitude}?exclude=hourly,daily,flags`
    );
    const weather = await weatherPromise.json();
    return weather.currently;
  }
  return new Error("Couldn't retrieve weather or user coordinates");
}

export default getWeather;
