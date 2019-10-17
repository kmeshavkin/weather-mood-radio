import { DARK_SKY_KEY } from '../privateKeys';
import { SEASONS, DAY_TIME } from './constants';

const hourInMS = 1000 * 60 * 60;

/**
 * Get user geoposition
 * @returns {Object} User geoposition
 */
export function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).catch(e => console.log('test', e));
}

/**
 * Receives current weather from darksky.net
 * @param {Object} position Current position
 * @returns {Promise<Object | Error>} Object with weather data (icon (current weather), sunriseTime and sunsetTime) or error
 */
export async function getWeather(position) {
  if (!position) return undefined;
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

/**
 * Takes latitude and current month and returns season
 * @param {Object} position Current position
 * @returns {String} Current season
 */
export function getSeason(position) {
  if (!position) return undefined;
  const seasonIndex = Math.floor(((new Date().getMonth() % 11) + 1) / 3);
  return position.coords.latitude > 0
    ? [SEASONS.winter, SEASONS.spring, SEASONS.summer, SEASONS.autumn][seasonIndex]
    : [SEASONS.summer, SEASONS.autumn, SEASONS.winter, SEASONS.spring][seasonIndex];
}

export function getDayTime(sunriseTime, sunsetTime) {
  const currentDate = new Date().getTime();
  const sunriseDate = sunriseTime;
  const sunsetDate = sunsetTime;
  if (currentDate - (sunriseDate - hourInMS) < 0) return DAY_TIME.night;
  if (currentDate - (sunriseDate + hourInMS * 3) < 0) return DAY_TIME.morning;
  if (currentDate - (sunsetDate - hourInMS * 3) < 0) return DAY_TIME.day;
  if (currentDate - (sunsetDate + hourInMS) < 0) return DAY_TIME.evening;
  return DAY_TIME.night;
}
