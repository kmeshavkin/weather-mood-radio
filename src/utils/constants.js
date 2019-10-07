// How much songs to retrieve at one time
export const PAGE_SIZE = 200;
// Default volume
export const DEFAULT_VOLUME = 0.3;
// How much segments in rewind slider
export const REWIND_SLIDER_MAX = 200;
// Genres to randonly pick from
export const GENRES = 'lofi hip-hop,lo-fi hip-hop,lofi,lo fi,chillhop';
// Convert weather from darksky.net to more convenient name
export const WEATHER_NAMES = {
  'clear-day': 'clear',
  'clear-night': 'clear',
  rain: 'rain',
  snow: 'snow',
  sleet: 'rain',
  wind: 'windy',
  fog: 'fog',
  cloudy: 'cloudy',
  'partly-cloudy-day': 'cloudy',
  'partly-cloudy-night': 'cloudy',
  hail: 'rain',
  thunderstorm: 'rain',
  tornado: 'windy'
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
  night: {
    rain: 'rain night',
    snow: 'snow night',
    wind: 'SEASON night',
    fog: 'SEASON night',
    cloudy: 'SEASON night',
    clear: 'SEASON night'
  },
  morning: {
    rain: 'rain morning',
    snow: 'snow',
    wind: 'SEASON',
    fog: 'fog morning',
    cloudy: 'cloudy morning',
    clear: 'SEASON morning'
  },
  day: {
    rain: 'rain SEASON',
    snow: 'snow SEASON',
    wind: 'wind SEASON',
    fog: 'fog SEASON',
    cloudy: 'cloudy SEASON',
    clear: 'SEASON'
  },
  evening: {
    rain: 'rain evening',
    snow: 'snow',
    wind: 'SEASON',
    fog: 'fog SEASON',
    cloudy: 'cloudy evening',
    clear: 'SEASON evening'
  }
};
