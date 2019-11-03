// How much songs to retrieve at one time
export const PAGE_SIZE = 200;
// Default volume
export const DEFAULT_VOLUME = 0.3;
// How much segments in rewind slider
export const REWIND_SLIDER_MAX = 200;
// Genres to randomly pick from
export const GENRES =
  'lofi,lo fi,lo-fi,lofi hip-hop,lo fi hip-hop,lo-fi hip-hop,lofi hip hop,lo fi hip hop,lo-fi hip hop,lofi hiphop,lo fi hiphop,lo-fi hiphop,chillhop';

// Weather names as constants
export const WEATHER = {
  clear: 'clear',
  rain: 'rain',
  snow: 'snow',
  windy: 'windy',
  fog: 'fog',
  cloudy: 'cloudy'
};

// Seasons names as constants
export const SEASONS = {
  winter: 'winter',
  spring: 'spring',
  summer: 'summer',
  autumn: 'autumn'
};

// Day time names as constants
export const DAY_TIME = {
  night: 'night',
  morning: 'morning',
  day: 'day',
  evening: 'evening'
};

// Convert weather from darksky.net to more convenient name
export const API_TO_WEATHER = {
  'clear-day': WEATHER.clear,
  'clear-night': WEATHER.clear,
  rain: WEATHER.rain,
  snow: WEATHER.snow,
  sleet: WEATHER.rain,
  wind: WEATHER.windy,
  fog: WEATHER.fog,
  cloudy: WEATHER.cloudy,
  'partly-cloudy-day': WEATHER.cloudy,
  'partly-cloudy-night': WEATHER.cloudy,
  hail: WEATHER.rain,
  thunderstorm: WEATHER.rain,
  tornado: WEATHER.windy
};

// Synonyms for the one category to randomly pick from
export const SYNONYMS = {
  rain: ['rainy', 'raining'],
  snow: ['snowy', 'snowing', 'cold'],
  fog: ['fog', 'foggy'],
  cloudy: ['cloudy', 'hazy']
};

// Matrix mapped below, S is current season
//          rain  snow  wind  fog   cloudy  clear
// night    r+n   s+n   S+n   S+n   S+n     S+n
// morning  r+m   s     S     f+m   c+m     S+m
// day      r+S   s+S   w+S   f+S   c+S     S
// evening  r+e   s     S     f+S   c+e     S+e
export const MOOD_MATRIX = {
  [DAY_TIME.night]: {
    [WEATHER.rain]: `${WEATHER.rain} ${[DAY_TIME.night]}`,
    [WEATHER.snow]: `${WEATHER.snow} ${[DAY_TIME.night]}`,
    [WEATHER.windy]: `SEASON ${[DAY_TIME.night]}`,
    [WEATHER.fog]: `${WEATHER.fog} ${[DAY_TIME.night]}`,
    [WEATHER.cloudy]: `SEASON ${[DAY_TIME.night]}`,
    [WEATHER.clear]: `SEASON ${[DAY_TIME.night]}`
  },
  [DAY_TIME.morning]: {
    [WEATHER.rain]: `${WEATHER.rain} ${[DAY_TIME.morning]}`,
    [WEATHER.snow]: `${WEATHER.snow}`,
    [WEATHER.windy]: `SEASON`,
    [WEATHER.fog]: `${WEATHER.fog} ${[DAY_TIME.morning]}`,
    [WEATHER.cloudy]: `${WEATHER.cloudy} ${[DAY_TIME.morning]}`,
    [WEATHER.clear]: `SEASON ${[DAY_TIME.morning]}`
  },
  [DAY_TIME.day]: {
    [WEATHER.rain]: `${WEATHER.rain} SEASON`,
    [WEATHER.snow]: `${WEATHER.snow} SEASON`,
    [WEATHER.windy]: `${WEATHER.windy} SEASON`,
    [WEATHER.fog]: `${WEATHER.fog}`,
    [WEATHER.cloudy]: `${WEATHER.cloudy} SEASON`,
    [WEATHER.clear]: `SEASON`
  },
  [DAY_TIME.evening]: {
    [WEATHER.rain]: `${WEATHER.rain} ${[DAY_TIME.evening]}`,
    [WEATHER.snow]: `${WEATHER.snow}`,
    [WEATHER.windy]: `SEASON`,
    [WEATHER.fog]: `${WEATHER.fog}`,
    [WEATHER.cloudy]: `${WEATHER.cloudy} ${[DAY_TIME.evening]}`,
    [WEATHER.clear]: `SEASON ${[DAY_TIME.evening]}`
  }
};
