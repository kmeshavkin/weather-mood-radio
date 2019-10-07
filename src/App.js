/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { Grid, TextField } from '@material-ui/core';
import Player from './Components/Player/Player';
import { getPosition, getSeason, getWeather, getDayTime } from './utils/getMood';
import { WEATHER_NAMES, SYNONYMS, MOOD_MATRIX } from './utils/constants';
import { StyledMoodGrid } from './App.styled';
import { getRandom, capitalizeFirst } from './utils/functions';

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = { season: undefined, weather: undefined, mood: undefined, dayTime: undefined };
  }

  componentDidMount() {
    const callWeatherPeriodically = async () => {
      const position = await getPosition();
      const season = getSeason(position);
      const weatherData = await getWeather(position);
      const weather = WEATHER_NAMES[weatherData.icon];
      const weatherSynonym = SYNONYMS[weather] || weather;
      console.log('weather: ', weatherData, weather);
      const dayTime = getDayTime(weatherData.sunriseTime, weatherData.sunsetTime);
      const mood = MOOD_MATRIX[dayTime][weather].replace(weather, getRandom(weatherSynonym)).replace('SEASON', season);
      this.setState({ season, weather, mood, dayTime });
      setTimeout(callWeatherPeriodically, 300000);
    };
    callWeatherPeriodically();
  }

  render() {
    const { weather, mood, dayTime, season } = this.state;
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Player mood={mood} />
        </Grid>
        <StyledMoodGrid item container justify="space-evenly" spacing={1}>
          <Grid item>
            <TextField
              disabled
              label="Weather"
              value={capitalizeFirst(weather) || 'pending...'}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              label="Day time"
              value={capitalizeFirst(dayTime) || 'pending...'}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              label="Season"
              value={capitalizeFirst(season) || 'pending...'}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </StyledMoodGrid>
      </Grid>
    );
  }
}

export default App;
