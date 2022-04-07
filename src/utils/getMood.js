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
  }).catch((e) => console.error('Failed to receive geolocation:', e));
}

/**
 * Receives current weather from darksky.net
 * @param {Object} position Current position
 * @returns {Promise<Object | Error>} Object with weather data (icon (current weather), sunriseTime and sunsetTime) or error
 */
export async function getWeather(position) {
  if (!position) return undefined;
  const weatherPromise = await fetch(
    `https://corsanywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${position.coords.latitude},${position.coords.longitude}`
  );
  const weather = await weatherPromise.json();
  return {
    icon: weather.currently.icon,
    sunriseTime: weather.daily.data[0].sunriseTime * 1000, // * 1000 because API returns UNIX timestamp
    sunsetTime: weather.daily.data[0].sunsetTime * 1000,
  };
}

/**
 * Takes latitude and current month and returns season
 * @param {number} latitude Current latitude
 * @returns {String} Current season
 */
export function getSeason(latitude) {
  const shiftSeasons = latitude < 0;
  // % 12 shifts December to index 0, so 0-2 is first season, 3-5 is second and so on
  const seasonNumber = (new Date().getMonth() + 1 + (shiftSeasons ? 6 : 0)) % 12;
  if (seasonNumber < 3) return SEASONS.winter;
  if (seasonNumber < 6) return SEASONS.spring;
  if (seasonNumber < 9) return SEASONS.summer;
  return SEASONS.autumn;
}

/**
 * Takes sunriseTime and sunsetTime and returns current day time
 * @param {number} sunriseTime Sunrise time in ms
 * @param {number} sunsetTime Sunset time in ms
 * @returns {String} Current day time
 */
export function getDayTime(sunriseTime, sunsetTime) {
  const currentDate = new Date().getTime();
  if (currentDate - (sunriseTime - hourInMS) < 0) return DAY_TIME.night;
  if (currentDate - (sunriseTime + hourInMS * 3) < 0) return DAY_TIME.morning;
  if (currentDate - (sunsetTime - hourInMS * 3) < 0) return DAY_TIME.day;
  if (currentDate - (sunsetTime + hourInMS) < 0) return DAY_TIME.evening;
  return DAY_TIME.night;
}
