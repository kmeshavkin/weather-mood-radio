import { DARK_SKY_KEY } from '../privateKeys';

const hourInMS = 1000 * 60 * 60;

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
 * @returns {Object | Error} Object with weather data (icon (current weather), sunriseTime and sunsetTime) or error
 */
export async function getWeather() {
  if (navigator.geolocation) {
    const position = await getPosition();
    const weatherPromise = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${position.coords.latitude},${position.coords.longitude}`
    );
    const weather = await weatherPromise.json();
    return {
      icon: weather.currently.icon,
      sunriseTime: weather.daily.data[0].sunriseTime * 1000, // * 1000 because API returns UNIX timestamp
      sunsetTime: weather.daily.data[0].sunsetTime * 1000
    };
  }
  return new Error("Couldn't retrieve weather or user coordinates");
}

export function getDayTime(sunriseTime, sunsetTime) {
  const currentDate = new Date() - 0; // - 0 to convert in ms
  const sunriseDate = sunriseTime;
  const sunsetDate = sunsetTime;
  if (currentDate - (sunriseDate - hourInMS) < 0) return 'night';
  if (currentDate - (sunriseDate + hourInMS * 3) < 0) return 'morning';
  if (currentDate - (sunsetDate - hourInMS * 3) < 0) return 'day';
  if (currentDate - (sunsetDate + hourInMS) < 0) return 'evening';
  return 'night';
}
