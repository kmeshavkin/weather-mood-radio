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
  wind: 'wind',
  fog: 'fog',
  cloudy: 'cloudy',
  'partly-cloudy-day': 'cloudy',
  'partly-cloudy-night': 'clear',
  hail: 'rain',
  thunderstorm: 'rain',
  tornado: 'wind'
};

// Synonyms for the one category to randomly pick from
export const SYNONYMS = {
  rain: ['rain', 'rainy', 'raining'],
  snow: ['snow', 'snowy', 'cold'],
  wind: ['wind', 'windy'], // breeze?
  fog: ['fog'],
  cloudy: ['cloudy', 'hazy']
};
// Tags to blacklist (to include purely lofi hip-hop)
export const TAG_BLACKLIST = ['rap', 'rock', 'garage?', 'indie', 'podcast', 'pop?'];
