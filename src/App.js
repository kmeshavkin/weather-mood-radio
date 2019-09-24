/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { Grid, TextField } from '@material-ui/core';
import Player from './Components/Player/Player';
import { getWeather, getDayTime } from './utils/getMood';
import { WEATHER_NAMES, SYNONYMS } from './utils/constants';
import { StyledMoodGrid } from './App.styled';
import { getRandom } from './utils/functions';

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = { weather: undefined, mood: undefined };
  }

  componentDidMount() {
    getWeather().then(weatherData => {
      const weather = WEATHER_NAMES[weatherData.icon];
      console.log('weather: ', weatherData, weather);
      const dayTime = getDayTime(weatherData.sunriseTime, weatherData.sunsetTime);
      const mood = weather === 'clear' ? dayTime : getRandom(SYNONYMS[weather]);
      this.setState({ weather, mood, dayTime });
    });
  }

  render() {
    const { weather, mood, dayTime } = this.state;
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Player mood={mood} />
        </Grid>
        <StyledMoodGrid item container justify="space-evenly" spacing={1}>
          <Grid item>
            <TextField disabled label="Weather" value={weather || 'pending...'} margin="normal" variant="outlined" />
          </Grid>
          <Grid item>
            <TextField disabled label="Day time" value={dayTime || 'pending...'} margin="normal" variant="outlined" />
          </Grid>
        </StyledMoodGrid>
      </Grid>
    );
  }
}

export default App;
