import PropTypes from 'prop-types';

/**
 * Dispatches new track object (with play controls) and play info in redux
 * @param {Object} track Track object from Soundcloud with various functions related to playback control
 * @param {Object} trackInfo Track info object with data about track retrieved from Soundcloud
 */
export const newTrackType = PropTypes.func;

/**
 * Dispatches updated playHistory and currentTrackIndex in redux
 * @param {Array} playHistory Array of track ids that were played before, these ids are Soundcloud ids
 * @param {number} currentTrackIndex Current index of track playing in playHistory array
 */
export const changeTrackType = PropTypes.func;

/**
 * Dispatches updated user weather state in redux
 * @param {String} weather Current weather, usually retrieved from darksky.net
 * Currently supported weather types: clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night, hail, thunderstorm, tornado
 */
export const changeWeatherType = PropTypes.func;

// Track object from Soundcloud with various functions related to playback control
export const trackType = PropTypes.shape({
  setVolume: PropTypes.func.isRequired,
  isPlaying: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  currentTime: PropTypes.func.isRequired,
  getDuration: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired
});

// Track info object with data about track retrieved from Soundcloud
export const trackInfoType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  artwork_url: PropTypes.string,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({ username: PropTypes.string.isRequired }),
  permalink_url: PropTypes.string.isRequired
});

// Array of track ids that were played before, these ids are Soundcloud ids
export const playHistoryType = PropTypes.arrayOf(PropTypes.number);

// Current index of track playing in playHistory array
export const currentTrackIndexType = PropTypes.number;

// Shows if new song request is currently processing, so if it's allowed to perform play actions or not
export const playAllowedType = PropTypes.bool;

// Current weather
export const weatherType = PropTypes.string;
